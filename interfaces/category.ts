import { Document, Model } from "mongoose";
import { userId } from "./user";

export interface ICategory extends Document {
  title: string
  slug: string
}

export type categoryId = userId

export type createCategoryParams = {
  title: string
  slug: string
}

export interface ICategoryModel extends Model<ICategory> {
  createCategory: (params: createCategoryParams) => Promise<ICategory>
  editCategory: (id: categoryId, slug: string) => Promise<boolean>
  deleteCategory: (id: categoryId) => Promise<boolean>
  getCategory:(id: categoryId) => Promise<ICategory> | Promise<boolean>
  getCategories: ()  => Promise<ICategory[]> | Promise<boolean>
}