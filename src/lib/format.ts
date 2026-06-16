export function formatCurrency(value: number | string) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function toReferenceMonth(value: string) {
  return new Date(`${value}-01T00:00:00.000Z`);
}

export function referenceMonthInput(value = new Date()) {
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function addMonths(date: Date, months: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
}

export function sameMonthDate(source: Date, referenceMonth: Date) {
  const year = referenceMonth.getUTCFullYear();
  const month = referenceMonth.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const day = Math.min(source.getUTCDate(), lastDay);
  return new Date(Date.UTC(year, month, day));
}
