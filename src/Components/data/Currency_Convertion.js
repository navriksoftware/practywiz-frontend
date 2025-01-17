// export const CURRENCY_CONFIG = {
//   USD: {
//     symbol: "$",
//     range: { min: 10, max: 100 },
//     defaultPrice: 50,
//   },
//   INR: {
//     symbol: "₹",
//     range: { min: 500, max: 5000 },
//     defaultPrice: 1000,
//   },
//   EUR: {
//     symbol: "€",
//     range: { min: 10, max: 200 },
//     defaultPrice: 75,
//   },
//   JPY: {
//     symbol: "¥",
//     range: { min: 1000, max: 10000 },
//     defaultPrice: 5000,
//   },
// };

// export const countryCurrencyData = {
//   US: { currency: "USD", range: { min: 0, max: 100 } },
//   IN: { currency: "INR", range: { min: 500, max: 5000 } },
//   DE: { currency: "EUR", range: { min: 10, max: 200 } },
//   JP: { currency: "JPY", range: { min: 1000, max: 10000 } },
// };

// export const allCurrencies = ["USD", "INR", "EUR", "JPY"];

// export const countryCurrencyMapping = [
//   {
//     country: "United States",
//     currency: "US",
//     currencySymbol: "$",
//     conversionRate: 1, // Conversion rate relative to USD
//   },
//   {
//     country: "India",
//     currency: "IN",
//     currencySymbol: "₹",
//     conversionRate: 82.5, // 1 USD = 82.50 INR
//   },
//   {
//     country: "United Kingdom",
//     currency: "GB",
//     currencySymbol: "£",
//     conversionRate: 0.75, // 1 USD = 0.75 GBP
//   },
//   {
//     country: "Canada",
//     currency: "CA",
//     currencySymbol: "C$",
//     conversionRate: 1.36, // 1 USD = 1.36 CAD
//   },
//   {
//     country: "Eurozone",
//     currency: "EU",
//     currencySymbol: "€",
//     conversionRate: 0.92, // 1 USD = 0.92 EUR
//   },
//   {
//     country: "Australia",
//     currency: "AU",
//     currencySymbol: "A$",
//     conversionRate: 1.5, // 1 USD = 1.50 AUD
//   },
//   {
//     country: "Japan",
//     currency: "JP",
//     currencySymbol: "¥",
//     conversionRate: 130.15, // 1 USD = 130.15 JPY
//   },
//   {
//     country: "China",
//     currency: "CN",
//     currencySymbol: "¥",
//     conversionRate: 7.15, // 1 USD = 7.15 CNY
//   },
//   {
//     country: "Brazil",
//     currency: "BR",
//     currencySymbol: "R$",
//     conversionRate: 5.25, // 1 USD = 5.25 BRL
//   },
//   {
//     country: "Mexico",
//     currency: "MX",
//     currencySymbol: "MX$",
//     conversionRate: 18.45, // 1 USD = 18.45 MXN
//   },
// ];
export const CURRENCY_CONFIG = {
  USD: {
    symbol: "$",
    range: { min: 10, max: 100 },
    defaultPrice: 50,
  },
  INR: {
    symbol: "₹",
    range: { min: 500, max: 5000 },
    defaultPrice: 1000,
  },
  EUR: {
    symbol: "€",
    range: { min: 10, max: 200 },
    defaultPrice: 75,
  },
  JPY: {
    symbol: "¥",
    range: { min: 1000, max: 10000 },
    defaultPrice: 5000,
  },
  GBP: {
    symbol: "£",
    range: { min: 10, max: 150 },
    defaultPrice: 60,
  },
  CAD: {
    symbol: "C$",
    range: { min: 15, max: 200 },
    defaultPrice: 100,
  },
  AUD: {
    symbol: "A$",
    range: { min: 20, max: 250 },
    defaultPrice: 120,
  },
  CNY: {
    symbol: "¥",
    range: { min: 100, max: 2000 },
    defaultPrice: 500,
  },
  BRL: {
    symbol: "R$",
    range: { min: 50, max: 1000 },
    defaultPrice: 250,
  },
  MXN: {
    symbol: "MX$",
    range: { min: 20, max: 1500 },
    defaultPrice: 400,
  },
};

export const countryCurrencyData = {
  US: { currency: "USD", range: { min: 10, max: 100 } },
  IN: { currency: "INR", range: { min: 500, max: 5000 } },
  DE: { currency: "EUR", range: { min: 10, max: 200 } },
  JP: { currency: "JPY", range: { min: 1000, max: 10000 } },
  GB: { currency: "GBP", range: { min: 10, max: 150 } },
  CA: { currency: "CAD", range: { min: 15, max: 200 } },
  AU: { currency: "AUD", range: { min: 20, max: 250 } },
  CN: { currency: "CNY", range: { min: 100, max: 2000 } },
  BR: { currency: "BRL", range: { min: 50, max: 1000 } },
  MX: { currency: "MXN", range: { min: 20, max: 1500 } },
};

export const allCurrencies = [
  "USD",
  "INR",
  "EUR",
  "JPY",
  "GBP",
  "CAD",
  "AUD",
  "CNY",
  "BRL",
  "MXN",
];

export const countryCurrencyMapping = [
  {
    country: "United States",
    currency: "US",
    currencySymbol: "$",
    conversionRate: 1, // Conversion rate relative to USD
  },
  {
    country: "India",
    currency: "IN",
    currencySymbol: "₹",
    conversionRate: 82.5, // 1 USD = 82.50 INR
  },
  {
    country: "United Kingdom",
    currency: "GB",
    currencySymbol: "£",
    conversionRate: 0.75, // 1 USD = 0.75 GBP
  },
  {
    country: "Canada",
    currency: "CA",
    currencySymbol: "C$",
    conversionRate: 1.36, // 1 USD = 1.36 CAD
  },
  {
    country: "Eurozone",
    currency: "EU",
    currencySymbol: "€",
    conversionRate: 0.92, // 1 USD = 0.92 EUR
  },
  {
    country: "Australia",
    currency: "AU",
    currencySymbol: "A$",
    conversionRate: 1.5, // 1 USD = 1.50 AUD
  },
  {
    country: "Japan",
    currency: "JP",
    currencySymbol: "¥",
    conversionRate: 130.15, // 1 USD = 130.15 JPY
  },
  {
    country: "China",
    currency: "CN",
    currencySymbol: "¥",
    conversionRate: 7.15, // 1 USD = 7.15 CNY
  },
  {
    country: "Brazil",
    currency: "BR",
    currencySymbol: "R$",
    conversionRate: 5.25, // 1 USD = 5.25 BRL
  },
  {
    country: "Mexico",
    currency: "MX",
    currencySymbol: "MX$",
    conversionRate: 18.45, // 1 USD = 18.45 MXN
  },
];
