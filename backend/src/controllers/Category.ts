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

const getAllFlattenedCategories = async (): Promise<Category[]> => {
  try {
    return await categoryModel.find({}, { _id: 0 }).lean();
  } catch (error) {
    console.error('Something went wrong getting all flattened categories:', error);
    throw error;
  }
};

const getAllParentCategories = async (categoryID: string): Promise<Category | null> => {
  try {
    const category = await categoryModel.findOne({ categoryID }, { _id: 0 });

    if (!category) {
      console.error('Category not found');

      return null;
    }

    const categoryParents: Category[] = [];
    categoryParents.push(category);

    const buildCategoryWithParents = async (currentCategory: Category): Promise<void> => {
      if (currentCategory.parentCategory) {
        const parentCategory = await categoryModel.findOne({
          categoryID: currentCategory.parentCategory,
        }, { _id: 0 });

        if (parentCategory) {
          categoryParents.push(parentCategory);

          await buildCategoryWithParents(parentCategory);
        } else {
          console.error('Parent category not found');
        }
      }
    };

    await buildCategoryWithParents(category);
    categoryParents.reverse();

    const categoryTree: Category[] = [];
    let currentParentTree: Category[] = categoryTree;

    for (const parentCategory of categoryParents) {
      const newNode: Category = {
        categoryID: parentCategory.categoryID,
        name: parentCategory.name,
        parentCategory: parentCategory?.parentCategory,
        subCategories: [],
      };

      if (currentParentTree.length === 0) {
        currentParentTree.push(newNode);
      } else {
        const lastNode = currentParentTree[currentParentTree.length - 1];
        lastNode?.subCategories?.push(newNode);
      }

      if (newNode.subCategories) {
        currentParentTree = newNode.subCategories;
      }
    }

    return categoryTree[0];
  } catch (error) {
    console.error('Something went wrong getting parent categories:', error);
    throw error;
  }
};

const getCategoryById = async (categoryID: string): Promise<Category | null> => {
  try {
    return await categoryModel.findOne({ categoryID }, { _id: 0 })?.lean();
  } catch (error) {
    console.error('Something went wrong getting the category by ID:', error);
    throw error;
  }
};

const getSubcategoriesByParentId = async (parentCategoryID: string): Promise<Category | null> => {
  try {
    return (await getAllCategories()).filter((category) => category.categoryID === parentCategoryID)[0];
  } catch (error) {
    console.error('Something went wrong getting subcategories by parent ID:', error);
    throw error;
  }
};

const categoryController = {
  getAllCategories,
  getAllParentCategories,
  getCategoryById,
  getSubcategoriesByParentId,
  getAllFlattenedCategories,
};

export default categoryController;
