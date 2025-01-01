import {
  Category,
  CategoryCreate,
  ApiResponseCategories,
} from "../../data/types/categories";
import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from "./config";

async function handleResponse<T>(
  response: Response
): Promise<ApiResponseCategories<T>> {
  if (!response.ok) {
    let errorText = `HTTP error ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorText = errorData.error;
      }
    } catch (jsonError) {
      //silencio el error de json parse
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

export const getCategories = async (
  userId: string
): Promise<ApiResponseCategories<Category[]>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.categories}?userId=${userId}`
    );
    return handleResponse<Category[]>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const getCategoryById = async (
  id: string
): Promise<ApiResponseCategories<Category>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.categories}/${id}`
    );
    return handleResponse<Category>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const createCategory = async (
  category: CategoryCreate
): Promise<ApiResponseCategories<Category>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.categories}`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(category),
    });
    return handleResponse<Category>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const updateCategory = async (
  id: string,
  category: CategoryCreate
): Promise<ApiResponseCategories<Category>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.categories}/${id}`,
      {
        method: "PUT", // O PATCH si prefieres actualizaciones parciales
        headers: API_HEADERS,
        body: JSON.stringify(category),
      }
    );
    return handleResponse<Category>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const deleteCategory = async (
  id: string
): Promise<ApiResponseCategories<null>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.categories}/${id}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse<null>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};

export const deleteCategoryByName = async (
  userId: string,
  name: string
): Promise<ApiResponseCategories<null>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.categories}?userId=${userId}&name=${name}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse<null>(response);
  } catch (error) {
    return { data: null, error: "Network error" };
  }
};
