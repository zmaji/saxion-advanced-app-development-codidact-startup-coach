export interface Category {
  categoryID: string,
  parentCategoryID?: string,
  name: string,
  subcategories?: Category[]
  parentCategory?: Category | null
}
