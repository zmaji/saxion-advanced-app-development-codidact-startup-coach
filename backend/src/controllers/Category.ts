import type { Category } from '../typings/Category';

import CategoryModel from '../models/Category';

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await CategoryModel.find({}, { _id: 0 });

    const buildCategoryTree = (categoryID: string | null): Category[] => {
      const children = categories.filter((category) => category.parentCategoryID === categoryID);

      return children.map((child) => ({
        categoryID: child.categoryID,
        name: child.name,
        subCategories: buildCategoryTree(child.categoryID),
      }));
    };

    const mainCategories = buildCategoryTree(null);

    return mainCategories;
  } catch (error) {
    console.error('Something went wrong getting all categories:', error);
    throw error;
  }
};


const getAllParentCategories = async (categoryID: string): Promise<Category | null> => {
  try {
    const category = await CategoryModel.findOne({ categoryID }, { _id: 0, __v: 0 });

    if (!category) {
      console.error('Category not found');

      return null;
    }

    const buildCategoryWithParents = async (currentCategory: Category): Promise<Category | null> => {
      if (currentCategory.parentCategoryID) {
        const parentCategory = await CategoryModel.findOne({
          categoryID: currentCategory.parentCategoryID,
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
