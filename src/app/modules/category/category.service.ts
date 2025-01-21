import { categories } from "../../lib/data";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

export const CategoryServices = {
  createCategory: async (data: ICategory) => {
    const category = new Category(data);
    return await category.save();
  },
  createCategories: async () => {
    categories.forEach(async (category) => {
      await new Category({ name: category }).save();
    });
  },
  getAllCategories: async () => {
    return await Category.find();
  },
  getCategoryById: async (id: string) => {
    return await Category.findById(id);
  },
  updateCategory: async (id: string, data: Partial<ICategory>) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },
  deleteCategory: async (id: string) => {
    return await Category.findByIdAndDelete(id);
  },
};
