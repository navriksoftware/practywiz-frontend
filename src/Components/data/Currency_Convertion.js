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
    GBP: {
      symbol: "£",
      range: { min: 5, max: 250 },
      defaultPrice: 60,
    },
    JPY: {
      symbol: "¥",
      range: { min: 1000, max: 10000 },
      defaultPrice: 5000,
    },
  };

  export  const countryCurrencyData = {
    US: { currency: "USD", range: { min: 0, max: 100 } },
    IN: { currency: "INR", range: { min: 500, max: 5000 } },
    DE: { currency: "EUR", range: { min: 10, max: 200 } },
    JP: { currency: "JPY", range: { min: 1000, max: 10000 } },
  };

  export const allCurrencies = ["USD", "INR", "EUR", "JPY", "GBP"];