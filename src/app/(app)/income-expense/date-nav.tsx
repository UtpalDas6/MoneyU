"use client";

import { useRouter } from "next/navigation";

function shiftDate(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
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
