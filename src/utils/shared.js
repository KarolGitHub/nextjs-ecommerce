export const currencySymbol = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  PLN: 'zł',
};

export function uniqueKeyValues(arr, key) {
  return [
    ...new Set(
      arr.map((obj) => {
        return obj[key];
      })
    ),
  ];
}
