export const currencySymbol = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  PLN: 'zł',
};

export const breakpoints = {
  lg: 910,
  xl: 1200,
};

export const fetchProductsLimit = (width) => {
  switch (true) {
    case width < breakpoints.lg:
      return 8;
    case width < breakpoints.xl:
      return 16;
    default:
      return 32;
  }
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
