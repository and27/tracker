interface Category {
  id: string;
  name: string;
  budget: number;
  isGlobal?: boolean;
  isActive?: boolean;
  icon?: IconType;
  group?: string;
  userId?: string;
}

type CategoryCreate = Omit<Category, "id">;

interface ApiResponseCategories<T> {
  data: T | null;
  error: string | null;
}

interface CategoryGroup {
  id: string;
  name: string;
  categories: Category[];
}
