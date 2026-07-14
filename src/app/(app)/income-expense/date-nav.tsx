"use client";

import { useRouter } from "next/navigation";

function shiftDate(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function DateNav({ date }: { date: string }) {
  const router = useRouter();
  const go = (iso: string) => router.push(`/income-expense?date=${iso}`);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => go(shiftDate(date, -1))}
        className="rounded-md border border-border px-2.5 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
        aria-label="Previous day"
      >
        ‹
      </button>
      <input
        type="date"
        value={date}
        onChange={(e) => go(e.target.value)}
        className="rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
      />
      <button
        type="button"
        onClick={() => go(shiftDate(date, 1))}
        className="rounded-md border border-border px-2.5 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
        aria-label="Next day"
      >
        ›
      </button>
    </div>
  );
}
