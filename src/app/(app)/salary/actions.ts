"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";

export async function saveSalary(formData: FormData) {
  const userId = await requireUserId();
  const employeeId = formData.get("employeeId") as string;
  const month = formData.get("month") as string;
  const baseAmount = Number(formData.get("baseAmount") ?? 0);
  const bonus = Number(formData.get("bonus") ?? 0);
  const deduction = Number(formData.get("deduction") ?? 0);

  const employee = await db.employee.findFirst({ where: { id: employeeId, userId } });
  if (!employee) return;

  await db.salaryPayment.upsert({
    where: { employeeId_month: { employeeId, month } },
    create: { employeeId, month, baseAmount, bonus, deduction },
    update: { baseAmount, bonus, deduction },
  });
  revalidatePath("/salary");
}

export async function togglePaid(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;

  const payment = await db.salaryPayment.findFirst({
    where: { id, employee: { userId } },
  });
  if (!payment) return;

  await db.salaryPayment.update({
    where: { id },
    data: { paid: !payment.paid, paidAt: !payment.paid ? new Date() : null },
  });
  revalidatePath("/salary");
}
