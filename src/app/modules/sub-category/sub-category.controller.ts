import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { SubCategoryServices } from "./sub-category.service";

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, name } = req.body;
  const response = await SubCategoryServices.createSubCategoryIntoDB(
    categoryId,
    name
  );
  sendResponse(res, {
    message: "Subcategory created successfully.",
    success: true,
    data: response,
    statusCode: StatusCodes.CREATED,
  });
});

const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {
  console.log("HEY");
  const response = await SubCategoryServices.getAllSubCategoriesFromDB();
  sendResponse(res, {
    message: "Fetched all subcategories successfully.",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const getSubCategoriesByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const response = await SubCategoryServices.getSubCategoriesByCategoryFromDB(
      categoryId
    );
    sendResponse(res, {
      message: "Fetched subcategories for the specified category successfully.",
      success: true,
      data: response,
      statusCode: StatusCodes.OK,
    });
  }
);

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;
  const response = await SubCategoryServices.updateSubCategoryIntoDB(id, data);
  sendResponse(res, {
    message: "Subcategory updated successfully.",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await SubCategoryServices.deleteSubCategoryIntoDB(id);
  sendResponse(res, {
    message: "Subcategory deleted successfully.",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
  deleteSubCategory,
};
