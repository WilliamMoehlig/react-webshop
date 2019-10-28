export function formatCurrency(number: number) {
  return number.toFixed(2).replace('.', ',');
}

export function calcDiscount(base: number, discounted: number) {
  const percentage = ((base - discounted) / base) * 100;
  return Math.round(percentage);
}
