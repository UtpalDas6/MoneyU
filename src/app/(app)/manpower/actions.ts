"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";

export async function addEmployee(formData: FormData) {
  const userId = await requireUserId();
  const name = (formData.get("name") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;

  if (!name || !role) return;

  await db.employee.create({ data: { userId, name, role, phone } });
  revalidatePath("/manpower");
}

export async function toggleActive(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const employee = await db.employee.findFirst({ where: { id, userId } });
  if (!employee) return;

  await db.employee.update({ where: { id }, data: { active: !employee.active } });
  revalidatePath("/manpower");
}

export async function deleteEmployee(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  await db.employee.deleteMany({ where: { id, userId } });
  revalidatePath("/manpower");
}
