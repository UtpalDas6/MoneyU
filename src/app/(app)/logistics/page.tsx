import { db } from "@/lib/db";
import { requireUserId } from "@/lib/session";
import { Card } from "@/components/card";
import { addItem, deleteItem, recordMovement } from "./actions";

export default async function LogisticsPage() {
  const userId = await requireUserId();
  const items = await db.inventoryItem.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Logistics</h1>
        <p className="mt-1 text-sm text-muted">Stock levels and movements.</p>
      </div>

      <Card>
        <h2 className="text-sm font-medium">Add item</h2>
        <form action={addItem} className="mt-3 flex flex-wrap items-center gap-2">
          <input
            name="name"
            required
            placeholder="Item name"
            className="min-w-0 flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            name="unit"
            placeholder="Unit (pcs, kg…)"
            defaultValue="pcs"
            className="w-32 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            name="stockQty"
            type="number"
            step="0.01"
            placeholder="Opening stock"
            defaultValue={0}
            className="w-32 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            name="reorderLevel"
            type="number"
            step="0.01"
            placeholder="Reorder level"
            defaultValue={0}
            className="w-32 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
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
        {items.length === 0 && (
          <p className="text-sm text-muted">No items yet — add your first one above.</p>
        )}
        {items.map((item) => {
          const low = item.stockQty <= item.reorderLevel;
          return (
            <Card key={item.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className={`text-sm ${low ? "text-danger" : "text-muted"}`}>
                  {item.stockQty} {item.unit} in stock
                  {low && " · reorder"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <form action={recordMovement} className="flex items-center gap-1.5">
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="type" value="IN" />
                  <input
                    name="quantity"
                    type="number"
                    step="0.01"
                    required
                    placeholder="Qty"
                    className="w-20 rounded-md border border-border bg-transparent px-2 py-1.5 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-md border border-border px-2.5 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Stock in
                  </button>
                </form>
                <form action={recordMovement} className="flex items-center gap-1.5">
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="type" value="OUT" />
                  <input
                    name="quantity"
                    type="number"
                    step="0.01"
                    required
                    placeholder="Qty"
                    className="w-20 rounded-md border border-border bg-transparent px-2 py-1.5 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-md border border-border px-2.5 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Stock out
                  </button>
                </form>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-xs text-danger hover:opacity-80">
                    Delete
                  </button>
                </form>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
