/* eslint-disable import/prefer-default-export */

export function formatCurrency(number: number) {
  return number.toFixed(2).replace('.', ',');
}
