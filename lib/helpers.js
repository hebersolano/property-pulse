export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(value);

export function getRateDisplay(rates) {
  if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
  else if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
  else if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
}
