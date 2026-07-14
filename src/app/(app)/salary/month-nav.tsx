"use client";

import { useRouter } from "next/navigation";

export function MonthNav({ month }: { month: string }) {
  const router = useRouter();
  return (
    <input
      type="month"
      value={month}
      onChange={(e) => router.push(`/salary?month=${e.target.value}`)}
      className="rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
    />
  );
}
