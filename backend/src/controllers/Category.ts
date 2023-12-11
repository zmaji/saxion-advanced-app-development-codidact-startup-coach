import type { Category } from '../typings/Category';

import categoryModel from '../models/Category';

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await categoryModel.find({}, { _id: 0 });

    const buildCategoryTree = (categoryID: string | null): Category[] => {
      const children = categories.filter((category) => category.parentCategory === categoryID);

      return children.map((child) => ({
        categoryID: child.categoryID,
        name: child.name,
        subCategories: buildCategoryTree(child.categoryID),
      }));
    };

    return buildCategoryTree(null);
  } catch (error) {
    console.error('Something went wrong getting all categories:', error);
    throw error;
  }
};

const getAllParentCategories = async (categoryID: string): Promise<Category | null> => {
  try {
    const category = await categoryModel.findOne({ categoryID }, { _id: 0, __v: 0 });

    if (!category) {
      console.error('Category not found');

      return null;
    }

    const buildCategoryWithParents = async (currentCategory: Category): Promise<Category | null> => {
      if (currentCategory.parentCategory) {
        const parentCategory = await categoryModel.findOne({
          categoryID: currentCategory.parentCategory,
        }, { _id: 0, __v: 0 });

        if (!parentCategory) {
          console.error('Parent category not found');

          return null;
        }

        return {
          categoryID: currentCategory.categoryID,
          name: currentCategory.name,
          parentCategory: await buildCategoryWithParents(parentCategory),
        };
      } else {
        return {
          categoryID: currentCategory.categoryID,
          name: currentCategory.name,
          parentCategory: null,
        };
      }
    };

    return await buildCategoryWithParents(category);
  } catch (error) {
    console.error('Something went wrong getting parent categories:', error);
    throw error;
  }
};

const categoryController = {
  getAllCategories,
  getAllParentCategories,
};

export default categoryController;
