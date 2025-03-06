export const defaultPaymentMethods = [
  {
    id: 2,
    name: "Card",
  },
  {
    id: 3,
    name: "Cash",
  },
  {
    id: 4,
    name: "Bank Transfer",
  },
  {
    id: 5,
    name: "Paypal",
  },
  {
    id: 7,
    name: "Wallet",
  },
  {
    id: 8,
    name: "Other",
  },
];

export const paymentMethodList = [
  "card",
  "cash",
  "bank_transfer",
  "paypal",
  "credit",
  "wallet",
  "other",
];

export type PaymentMethodListType =
  | "card"
  | "cash"
  | "bank_transfer"
  | "paypal"
  | "credit"
  | "wallet"
  | "other";
