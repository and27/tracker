export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  transactions: "/transactions",
  categories: "/categories",
  paymentMethods: "/payment-methods",
};

// aditional config, like common headers:
export const API_HEADERS = {
  "Content-Type": "application/json",
};
