export interface Category {
  categoryID: string;
  parentCategory?: string | Category | null
  name: string;
  subCategories?: Category[];
}
