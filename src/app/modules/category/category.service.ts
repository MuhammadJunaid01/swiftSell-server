import { searchHelper } from "../../../helpers/searchHelper";
import { IGenericResponse, IPaginationOption } from "../../interfaces";
import { categories } from "../../lib/data";
import {
  CategoryFilterableFields,
  CategorySearchableFields,
} from "./category.constant";
import { ICategory, ICategoryFilterableField } from "./category.interface";
import { Category } from "./category.model";

export const CategoryServices = {
  createCategory: async (data: ICategory) => {
    const category = new Category(data);
    return await category.save();
  },
  createCategories: async () => {
    categories.forEach(async (category) => {
      await new Category({ name: category.name, image: category.image }).save();
    });
  },
  getAllCategories: async (
    filters: ICategoryFilterableField,
    pagination: IPaginationOption
  ): Promise<IGenericResponse<ICategory[]>> => {
    // await updateIsDeleted();
    const option = searchHelper(filters, pagination, CategorySearchableFields);
    const result = await Category.find(option.whereCondition)
      .sort(option.sortCondition)
      .skip(option.skip)
      .limit(option.limit as number);
    const total = await Category.countDocuments(option.whereCondition);
    return {
      meta: {
        limit: option.limit,
        page: option.page,
        total,
      },
      data: result,
    };
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
const updateIsDeleted = async () => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({});

    // Iterate over each category and update if isDeleted is undefined
    const updatePromises = categories.map(async (category) => {
      if (category.isDeleted === undefined) {
        category.isDeleted = false;
        await category.save();
      }
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    console.log("Categories updated successfully.");
  } catch (error) {
    console.error("Error updating categories:", error);
  }
};
