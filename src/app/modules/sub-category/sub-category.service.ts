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
  return await SubCategory.find().populate("category", "name").exec();
};
export const getSubCategoriesByCategoryFromDB = async (categoryId: string) => {
  return await SubCategory.find({ category: categoryId }).exec();
};
export const updateSubCategoryIntoDB = async (
  subCategoryId: string,
  name: string
) => {
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    { name },
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
