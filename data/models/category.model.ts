import { categoryId, createCategoryParams, ICategory, ICategoryModel } from "../../interfaces/category";
import { CategorySchema } from "../schemas/category";
import { model } from "mongoose";

CategorySchema.statics.createCategory = async function (params:createCategoryParams) {
  const category = await this.create(params)
  return category
}

CategorySchema.statics.getCategory = async function (id:categoryId) {
  const category = await this.findById(id)
  if(category) return category
  return false;
}

CategorySchema.statics.getCategories = async function () {
  return await this.find({})
}

CategorySchema.statics.deleteCategory = async function (id:categoryId) {
  const category = await this.findById(id)
  let bool: boolean;
  category ? bool = true: bool = false;
  bool ? await category.deleteOne(): '';
  return bool;
}

CategorySchema.statics.editCategory = async function (id:categoryId, slug: string) {
  const category = await this.findById(id);
  let bool: boolean;
  category ? bool = true: bool = false;
  bool ? await category.updateOne({ slug }): '';
  return bool;
}

export const Categories = model<ICategory, ICategoryModel>('category', CategorySchema);