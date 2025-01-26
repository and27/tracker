interface Category {
  id: string;
  name: string;
  userId: string;
}

type CategoryCreate = Omit<Category, "id">;

interface ApiResponseCategories<T> {
  data: T | null;
  error: string | null;
}
