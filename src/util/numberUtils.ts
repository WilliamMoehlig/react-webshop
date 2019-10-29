export function formatCurrency(number: number): string {
  return number.toFixed(2).replace('.', ',');
}

export function calcDiscount(base: number, discounted: number): number {
  const percentage = ((base - discounted) / base) * 100;
  return Math.round(percentage);
}
