import {
  Transaction,
  TransactionCreate,
  ApiResponseTransactions,
} from "../../data/types/transactions";

import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from "./config";

async function handleResponse<T>(
  response: Response
): Promise<ApiResponseTransactions<T>> {
  if (!response.ok) {
    let errorText = `HTTP error ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorText = errorData.error;
      }
    } catch (jsonError) {
      console.error("Error parsing JSON error response", jsonError);
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

export const createTransaction = async (
  transaction: TransactionCreate
): Promise<ApiResponseTransactions<Transaction>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}`,
      {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(transaction),
      }
    );
    return handleResponse<Transaction>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

//Obatain all transactions from a user with pagination and sorting
export const getTransactions = async (
  userId: string,
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): Promise<ApiResponseTransactions<Transaction[]>> => {
  try {
    let url = `${API_BASE_URL}${API_ENDPOINTS.transactions}?userId=${userId}`;

    if (page && limit) {
      url += `&_page=${page}&_limit=${limit}`;
    }

    if (sortBy && sortOrder) {
      url += `&_sort=${sortBy}&_order=${sortOrder}`;
    }

    const response = await fetch(url);
    return handleResponse<Transaction[]>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const getLastTransactions = async (
  userId: string,
  limit: number
): Promise<ApiResponseTransactions<Transaction[]>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}?userId=${userId}&_sort=date&_order=desc&_limit=${limit}`
    );
    return handleResponse<Transaction[]>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const getTransactionById = async (
  id: string
): Promise<ApiResponseTransactions<Transaction>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}/${id}`
    );
    return handleResponse<Transaction>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const updateTransaction = async (
  id: string,
  transaction: TransactionCreate
): Promise<ApiResponseTransactions<Transaction>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}/${id}`,
      {
        method: "PUT", // O PATCH si prefieres actualizaciones parciales
        headers: API_HEADERS,
        body: JSON.stringify(transaction),
      }
    );
    return handleResponse<Transaction>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const deleteTransaction = async (
  id: string
): Promise<ApiResponseTransactions<null>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}/${id}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse<null>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const getTransactionsByPeriod = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<ApiResponseTransactions<Transaction[]>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.transactions}?userId=${userId}&date_gte=${startDate}&date_lte=${endDate}`
    );
    return handleResponse<Transaction[]>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};
