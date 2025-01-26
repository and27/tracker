import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from "./config";

async function handleResponse<T>(
  response: Response
): Promise<ApiResponsePaymentMethods<T>> {
  if (!response.ok) {
    let errorText = `HTTP error ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorText = errorData.error;
      }
    } catch (jsonError) {
      console.error(jsonError);
    }
    return { data: null, error: errorText };
  }

  try {
    const data = await response.json();
    return { data, error: null };
  } catch (jsonError) {
    return { data: null, error: "Error parsing JSON response" };
  }
}

export const getPaymentMethods = async (): Promise<
  ApiResponsePaymentMethods<PaymentMethod[]>
> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.paymentMethods}`
    );
    return handleResponse<PaymentMethod[]>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const getPaymentMethodById = async (
  id: string
): Promise<ApiResponsePaymentMethods<PaymentMethod>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.paymentMethods}/${id}`
    );
    return handleResponse<PaymentMethod>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const createPaymentMethod = async (
  paymentMethod: PaymentMethodCreate
): Promise<ApiResponsePaymentMethods<PaymentMethod>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.paymentMethods}`,
      {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(paymentMethod),
      }
    );
    return handleResponse<PaymentMethod>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const updatePaymentMethod = async (
  id: string,
  paymentMethod: PaymentMethodCreate
): Promise<ApiResponsePaymentMethods<PaymentMethod>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.paymentMethods}/${id}`,
      {
        method: "PUT",
        headers: API_HEADERS,
        body: JSON.stringify(paymentMethod),
      }
    );
    return handleResponse<PaymentMethod>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const deletePaymentMethod = async (
  id: string
): Promise<ApiResponsePaymentMethods<null>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.paymentMethods}/${id}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse<null>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};
