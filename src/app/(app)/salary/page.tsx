import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";
import { money, currentMonth, monthLabel } from "@/lib/format";
import { Card } from "@/components/card";
import { MonthNav } from "./month-nav";
import { saveSalary, togglePaid } from "./actions";

export default async function SalaryPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const userId = await requireUserId();
  const { month: monthParam } = await searchParams;
  const month = monthParam ?? currentMonth();

  const employees = await db.employee.findMany({
    where: { userId, active: true },
    orderBy: { name: "asc" },
    include: { payments: { where: { month } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Salary</h1>
          <p className="mt-1 text-sm text-muted">Payroll for {monthLabel(month)}.</p>
        </div>
        <MonthNav month={month} />
      </div>

      <div className="flex flex-col gap-3">
        {employees.length === 0 && (
          <p className="text-sm text-muted">No active employees — add one in Manpower first.</p>
        )}
        {employees.map((e) => {
          const payment = e.payments[0];
          const net = payment ? payment.baseAmount + payment.bonus - payment.deduction : null;
          return (
            <Card key={e.id}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-sm text-muted">{e.role}</p>
                </div>
                {payment && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Net {money(net!)}</span>
                    <form action={togglePaid}>
                      <input type="hidden" name="id" value={payment.id} />
                      <button
                        type="submit"
                        className={`rounded-md px-2.5 py-1 text-xs ${
                          payment.paid
                            ? "border border-border text-muted hover:text-foreground"
                            : "bg-accent text-accent-foreground hover:opacity-90"
                        }`}
                      >
                        {payment.paid ? "Paid ✓" : "Mark paid"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <form action={saveSalary} className="mt-3 flex flex-wrap items-center gap-2">
                <input type="hidden" name="employeeId" value={e.id} />
                <input type="hidden" name="month" value={month} />
                <label className="flex items-center gap-1.5 text-sm text-muted">
                  Base
                  <input
                    name="baseAmount"
                    type="number"
                    step="0.01"
                    defaultValue={payment?.baseAmount ?? ""}
                    className="w-28 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm text-foreground"
                  />
                </label>
                <label className="flex items-center gap-1.5 text-sm text-muted">
                  Bonus
                  <input
                    name="bonus"
                    type="number"
                    step="0.01"
                    defaultValue={payment?.bonus ?? 0}
                    className="w-24 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm text-foreground"
                  />
                </label>
                <label className="flex items-center gap-1.5 text-sm text-muted">
                  Deduction
                  <input
                    name="deduction"
                    type="number"
                    step="0.01"
                    defaultValue={payment?.deduction ?? 0}
                    className="w-24 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm text-foreground"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Save
                </button>
              </form>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
