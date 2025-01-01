export interface Category {
  id: string;
  name: string;
  userId: string;
}

export type CategoryCreate = Omit<Category, "id">;

export interface ApiResponseCategories<T> {
  data: T | null;
  error: string | null;
}
