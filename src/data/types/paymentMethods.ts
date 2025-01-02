export interface PaymentMethod {
  id: string;
  name: string;
}

export type PaymentMethodCreate = Omit<PaymentMethod, "id">;

export interface ApiResponsePaymentMethods<T> {
  data: T | null;
  error: string | null;
}
