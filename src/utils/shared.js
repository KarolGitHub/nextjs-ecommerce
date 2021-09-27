export const currencySymbol = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  PLN: 'zł',
};

export const breakpoints = {
  md: 637,
  lg: 927,
  xl: 1217,
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
