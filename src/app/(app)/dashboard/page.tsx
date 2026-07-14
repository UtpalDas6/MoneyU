import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";
import { StatCard, Card } from "@/components/card";
import { money, currentMonth } from "@/lib/format";

export default async function DashboardPage() {
  const userId = await requireUserId();

  const startOfMonth = new Date(currentMonth() + "-01");

  const [incomes, expenses, employees, lowStock, unpaidSalaries] = await Promise.all([
    db.income.aggregate({ where: { userId, date: { gte: startOfMonth } }, _sum: { amount: true } }),
    db.expense.aggregate({ where: { userId, date: { gte: startOfMonth } }, _sum: { amount: true } }),
    db.employee.count({ where: { userId, active: true } }),
    db.inventoryItem.findMany({ where: { userId }, orderBy: { name: "asc" } }),
    db.salaryPayment.count({
      where: { paid: false, month: currentMonth(), employee: { userId } },
    }),
  ]);

  const income = incomes._sum.amount ?? 0;
  const expense = expenses._sum.amount ?? 0;
  const lowStockItems = lowStock.filter((i) => i.stockQty <= i.reorderLevel);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">This month at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Income" value={money(income)} />
        <StatCard label="Expense" value={money(expense)} />
        <StatCard
          label={income >= expense ? "Profit" : "Loss"}
          value={money(Math.abs(income - expense))}
        />
        <StatCard label="Active staff" value={String(employees)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-sm font-medium">Low stock</h2>
          {lowStockItems.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Nothing needs restocking.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {lowStockItems.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span>{i.name}</span>
                  <span className="text-danger">
                    {i.stockQty} {i.unit} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h2 className="text-sm font-medium">Salary this month</h2>
          <p className="mt-2 text-sm text-muted">
            {unpaidSalaries === 0
              ? "All salaries settled."
              : `${unpaidSalaries} payment${unpaidSalaries > 1 ? "s" : ""} pending.`}
          </p>
        </Card>
      </div>
    </div>
  );
}
