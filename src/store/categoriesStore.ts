import { create } from "zustand";
import { getCategoriesWithBudget } from "../utils/supabaseDB";
import { iconsMap } from "../data/iconsMap";
import { FaQuestion } from "react-icons/fa";
import React from "react";

interface CategoriesState {
  categories: CategoryGroup[];
  setCategories: (categories: CategoryGroup[]) => void;
  fetchCategories: (userId: string) => Promise<void>;
  addCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  clearCategories: () => void;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  fetchCategories: async (userId) => {
    const consolidated = await getCategoriesWithBudget(userId);
    const categoriesWithIcons = consolidated?.map((group) => ({
      ...group,
      categories: group.categories.map((subcategory: Category) => ({
        ...subcategory,
        icon:
          iconsMap[subcategory.name.toLowerCase()] ||
          React.createElement(FaQuestion),
      })),
    }));
    if (categoriesWithIcons) set({ categories: categoriesWithIcons });
  },

  addCategory: (category) => {
    set((state) => {
      const currentGroup = state.categories.find(
        (g) => g.id === category.group
      );
      if (!currentGroup) return state;

      const updatedGroup: CategoryGroup = {
        ...currentGroup,
        categories: [...currentGroup.categories, category],
      };

      return {
        categories: [
          ...state.categories.filter((g) => g.id !== category.group),
          updatedGroup,
        ],
      };
    });
  },

  editCategory: (category) => {
    set((state) => {
      const currentGroup = state.categories.find(
        (g) => g.id === category.group
      );
      const oldGroup = state.categories.find((g) =>
        g.categories.find((c) => c.id === category.id)
      );

      if (!currentGroup || !oldGroup) return state;

      if (oldGroup.id === currentGroup.id) {
        const updatedGroup = {
          ...currentGroup,
          categories: currentGroup.categories.map((c) =>
            c.id === category.id ? { ...c, ...category } : c
          ),
        };

        return {
          categories: state.categories.map((g) =>
            g.id === updatedGroup.id ? updatedGroup : g
          ),
        };
      }

      const updatedOldGroup = {
        ...oldGroup,
        categories: oldGroup.categories.filter((c) => c.id !== category.id),
      };

      const updatedNewGroup = {
        ...currentGroup,
        categories: [...currentGroup.categories, category],
      };

      return {
        categories: state.categories.map((g) => {
          if (g.id === oldGroup.id) return updatedOldGroup;
          if (g.id === currentGroup.id) return updatedNewGroup;
          return g;
        }),
      };
    });
  },

  clearCategories: () => set({ categories: [] }),
}));
