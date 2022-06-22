import { Schema } from 'mongoose';
import { ICategory } from '../../interfaces/category';

export const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: [true, 'please provide a title for this category'],
    unique: true
  },
  slug: {
    type: String,
    required: [true, 'a slug is required for this category'],
  },
}, { timestamps: true})