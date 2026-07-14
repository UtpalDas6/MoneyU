import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";
import { money, todayISO } from "@/lib/format";
import { Card } from "@/components/card";
import { DateNav } from "./date-nav";
import { addEntry, updateEntry, deleteEntry } from "./actions";

type Entry = { id: string; item: string; amount: number };

function EntryRow({ kind, date, entry }: { kind: "income" | "expense"; date: string; entry: Entry }) {
  return (
    <form action={updateEntry} className="flex items-center gap-2">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={entry.id} />
      <input type="hidden" name="date" value={date} />
      <input
        name="item"
        defaultValue={entry.item}
        className="w-full min-w-0 flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
        placeholder="Item"
      />
      <input
        name="amount"
        type="number"
        step="0.01"
        defaultValue={entry.amount}
        className="w-28 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
        placeholder="Amount"
      />
      <button type="submit" className="text-xs text-muted hover:text-foreground">
        Save
      </button>
      <button
        type="submit"
        formAction={deleteEntry}
        className="text-xs text-danger hover:opacity-80"
      >
        Delete
      </button>
    </form>
  );
}

function AddRow({ kind, date }: { kind: "income" | "expense"; date: string }) {
  return (
    <form action={addEntry} className="flex items-center gap-2">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="date" value={date} />
      <input
        name="item"
        required
        className="w-full min-w-0 flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
        placeholder={kind === "income" ? "New income item" : "New expense item"}
      />
      <input
        name="amount"
        type="number"
        step="0.01"
        required
        className="w-28 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
        placeholder="Amount"
      />
      <button
        type="submit"
        className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:opacity-90"
      >
        Add
      </button>
    </form>
  );
}

export default async function IncomeExpensePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const userId = await requireUserId();
  const { date: dateParam } = await searchParams;
  const date = dateParam ?? todayISO();
  const dateObj = new Date(date);

  const [incomes, expenses] = await Promise.all([
    db.income.findMany({ where: { userId, date: dateObj }, orderBy: { createdAt: "asc" } }),
    db.expense.findMany({ where: { userId, date: dateObj }, orderBy: { createdAt: "asc" } }),
  ]);

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Income & Expense</h1>
          <p className="mt-1 text-sm text-muted">
            {money(totalIncome)} in · {money(totalExpense)} out ·{" "}
            {totalIncome >= totalExpense ? "profit " : "loss "}
            {money(Math.abs(totalIncome - totalExpense))}
          </p>
        </div>
        <DateNav date={date} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h2 className="text-sm font-medium">Income</h2>
          <div className="mt-3 flex flex-col gap-2">
            {incomes.map((entry) => (
              <EntryRow key={entry.id} kind="income" date={date} entry={entry} />
            ))}
            <AddRow kind="income" date={date} />
          </div>
        </Card>
        <Card>
          <h2 className="text-sm font-medium">Expense</h2>
          <div className="mt-3 flex flex-col gap-2">
            {expenses.map((entry) => (
              <EntryRow key={entry.id} kind="expense" date={date} entry={entry} />
            ))}
            <AddRow kind="expense" date={date} />
          </div>
        </Card>
      </div>
    </div>
  );
}
