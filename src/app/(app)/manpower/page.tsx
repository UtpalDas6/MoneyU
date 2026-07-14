import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";
import { Card } from "@/components/card";
import { addEmployee, toggleActive, deleteEmployee } from "./actions";

export default async function ManpowerPage() {
  const userId = await requireUserId();
  const employees = await db.employee.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Manpower</h1>
        <p className="mt-1 text-sm text-muted">Staff on record.</p>
      </div>

      <Card>
        <h2 className="text-sm font-medium">Add employee</h2>
        <form action={addEmployee} className="mt-3 flex flex-wrap items-center gap-2">
          <input
            name="name"
            required
            placeholder="Name"
            className="min-w-0 flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            name="role"
            required
            placeholder="Role"
            className="w-40 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            name="phone"
            placeholder="Phone"
            className="w-40 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:opacity-90"
          >
            Add
          </button>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {employees.length === 0 && (
          <p className="text-sm text-muted">No employees yet — add your first one above.</p>
        )}
        {employees.map((e) => (
          <Card key={e.id} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium">
                {e.name}{" "}
                {!e.active && <span className="text-xs text-muted">(inactive)</span>}
              </p>
              <p className="text-sm text-muted">
                {e.role}
                {e.phone && ` · ${e.phone}`} · joined{" "}
                {e.joinedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <form action={toggleActive}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="text-xs text-muted hover:text-foreground">
                  {e.active ? "Mark inactive" : "Mark active"}
                </button>
              </form>
              <form action={deleteEmployee}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="text-xs text-danger hover:opacity-80">
                  Delete
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
