interface Category {
  id: string;
  name: string;
  budget: any;
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
