import type { Category } from '../typings/Category';

import CategoryModel from '../models/Category';

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const categories = await CategoryModel.find({}, { _id: 0 });

        const buildCategoryTree = (categoryID: string | null): Category[] => {
            const children = categories.filter(category => category.parentCategoryID === categoryID);

            return children.map(child => ({
                categoryID: child.categoryID,
                name: child.name,
                subcategories: buildCategoryTree(child.categoryID),
            }));
        };

        const mainCategories = buildCategoryTree(null);

        return mainCategories;
    } catch (error) {
        console.error('Something went wrong getting all categories:', error);
        throw error;
    }
};

const categoryController = {
  getAllCategories,
};

export default categoryController;
