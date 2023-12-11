import type { Category } from '../typings/Category';

import mongoose, { Schema } from 'mongoose';

const categorySchema: Schema<Category> = new Schema({
  categoryID: {
    type: String,
    unique: true,
    immutable: true,
  },
  parentCategory: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  collection: 'categories',
  versionKey: false,
});

const CategoryModel = mongoose.model<Category>('Category', categorySchema);

export default CategoryModel;
