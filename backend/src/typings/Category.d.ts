export interface Category {
  categoryID: string;
  parentCategoryID?: string;
  parentCategory?: Category;
  name: string;
  subCategories?: Category[];
}
