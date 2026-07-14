"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";

type Kind = "income" | "expense";

export async function addEntry(formData: FormData) {
  const userId = await requireUserId();
  const kind = formData.get("kind") as Kind;
  const date = new Date(formData.get("date") as string);
  const item = (formData.get("item") as string)?.trim();
  const amount = Number(formData.get("amount"));

  if (!item || !Number.isFinite(amount)) return;

  if (kind === "income") {
    await db.income.create({ data: { userId, date, item, amount } });
  } else {
    await db.expense.create({ data: { userId, date, item, amount } });
  }
  revalidatePath("/income-expense");
}

export async function updateEntry(formData: FormData) {
  const userId = await requireUserId();
  const kind = formData.get("kind") as Kind;
  const id = formData.get("id") as string;
  const item = (formData.get("item") as string)?.trim();
  const amount = Number(formData.get("amount"));

  if (!item || !Number.isFinite(amount)) return;

  const where = { id, userId };
  if (kind === "income") {
    await db.income.updateMany({ where, data: { item, amount } });
  } else {
    await db.expense.updateMany({ where, data: { item, amount } });
  }
  revalidatePath("/income-expense");
}

export async function deleteEntry(formData: FormData) {
  const userId = await requireUserId();
  const kind = formData.get("kind") as Kind;
  const id = formData.get("id") as string;

  const where = { id, userId };
  if (kind === "income") {
    await db.income.deleteMany({ where });
  } else {
    await db.expense.deleteMany({ where });
  }
  revalidatePath("/income-expense");
}
