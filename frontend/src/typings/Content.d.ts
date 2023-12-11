export interface Category {
  categoryID: string,
  parentCategory?: string,
  name: string,
  subCategories?: Category[]
}