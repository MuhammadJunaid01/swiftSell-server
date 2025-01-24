import { fashionSubcategories, furnitureSubcategories } from "../../lib/data";
import { ISubCategory } from "./sub-category.interface";
import SubCategory from "./sub-category.model";

export const createSubCategoryIntoDB = async (
  categoryId: string,
  name: string
) => {
  const subCategory = new SubCategory({
    category: categoryId,
    name,
  });
  await subCategory.save();
  return subCategory;
};

export const getAllSubCategoriesFromDB = async () => {
  // fashionSubcategories.forEach(async ({ name, image }) => {
  //   await new SubCategory({
  //     name: name,
  //     image: image,
  //     category: "67927d11b7838fed7e6e5001",
  //   }).save();
  // });
  // return "lkjkl";
  return await SubCategory.find().populate("category");
};
export const getSubCategoriesByCategoryFromDB = async (categoryId: string) => {
  return await SubCategory.find({ category: categoryId }).exec();
};
export const updateSubCategoryIntoDB = async (
  subCategoryId: string,
  data: Partial<ISubCategory>
) => {
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    data,
    { new: true }
  );
  if (!updatedSubCategory) {
    throw new Error("SubCategory not found.");
  }
  return updatedSubCategory;
};
export const deleteSubCategoryIntoDB = async (subCategoryId: string) => {
  const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId);
  if (!deletedSubCategory) {
    throw new Error("SubCategory not found.");
  }
  return deletedSubCategory;
};

export const SubCategoryServices = {
  createSubCategoryIntoDB,
  getAllSubCategoriesFromDB,
  getSubCategoriesByCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryIntoDB,
};
