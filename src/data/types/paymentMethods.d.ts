interface PaymentMethod {
  id: string;
  name: string;
}

type PaymentMethodCreate = Omit<PaymentMethod, "id">;

interface ApiResponsePaymentMethods<T> {
  data: T | null;
  error: string | null;
}
