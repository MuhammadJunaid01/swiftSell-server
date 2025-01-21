import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const response = await CategoryServices.createCategory(req.body);
  sendResponse(res, {
    message: "Category created successfully",
    success: true,
    data: response,
    statusCode: httpStatus.CREATED,
  });
});
const createCategories = catchAsync(async (req: Request, res: Response) => {
  const response = await CategoryServices.createCategories();
  sendResponse(res, {
    message: "Category created successfully",
    success: true,
    data: response,
    statusCode: httpStatus.CREATED,
  });
});

const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
  const response = await CategoryServices.getAllCategories();
  sendResponse(res, {
    message: "Categories fetched successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.getCategoryById(id);
  sendResponse(res, {
    message: "Category fetched successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.updateCategory(id, req.body);
  sendResponse(res, {
    message: "Category updated successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.deleteCategory(id);
  sendResponse(res, {
    message: "Category deleted successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategories,
};
