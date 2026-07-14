const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const money = (n: number) => currency.format(n);

export const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const currentMonth = () => new Date().toISOString().slice(0, 7);

export const todayISO = () => new Date().toISOString().slice(0, 10);
