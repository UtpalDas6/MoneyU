"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";

export async function addItem(formData: FormData) {
  const userId = await requireUserId();
  const name = (formData.get("name") as string)?.trim();
  const unit = ((formData.get("unit") as string) || "pcs").trim();
  const stockQty = Number(formData.get("stockQty") ?? 0);
  const reorderLevel = Number(formData.get("reorderLevel") ?? 0);

  if (!name) return;

  await db.inventoryItem.create({
    data: { userId, name, unit, stockQty, reorderLevel },
  });
  revalidatePath("/logistics");
}

export async function deleteItem(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  await db.inventoryItem.deleteMany({ where: { id, userId } });
  revalidatePath("/logistics");
}

export async function recordMovement(formData: FormData) {
  const userId = await requireUserId();
  const itemId = formData.get("itemId") as string;
  const type = formData.get("type") as "IN" | "OUT";
  const quantity = Number(formData.get("quantity"));
  const note = (formData.get("note") as string)?.trim() || null;

  if (!Number.isFinite(quantity) || quantity <= 0) return;

  const item = await db.inventoryItem.findFirst({ where: { id: itemId, userId } });
  if (!item) return;

  const delta = type === "IN" ? quantity : -quantity;

  await db.$transaction([
    db.stockEntry.create({ data: { itemId, type, quantity, note } }),
    db.inventoryItem.update({
      where: { id: itemId },
      data: { stockQty: item.stockQty + delta },
    }),
  ]);
  revalidatePath("/logistics");
}
