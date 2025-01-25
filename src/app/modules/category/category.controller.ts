import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { CategoryServices } from "./category.service";
import pick from "../../../shared/pick";
import { CategoryFilterableFields } from "./category.constant";
import { paginationOption } from "../../../shared/constant";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const response = await CategoryServices.createCategory(req.body);
  sendResponse(res, {
    message: "Category created successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.CREATED,
  });
});
const createCategories = catchAsync(async (req: Request, res: Response) => {
  const response = await CategoryServices.createCategories();
  sendResponse(res, {
    message: "Category created successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.CREATED,
  });
});

const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
  const paginationOptions = pick(_req.query, paginationOption);
  const filters = pick(_req.query, CategoryFilterableFields);
  const response = await CategoryServices.getAllCategories(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    message: "Categories fetched successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.getCategoryById(id);
  sendResponse(res, {
    message: "Category fetched successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.updateCategory(id, req.body);
  sendResponse(res, {
    message: "Category updated successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await CategoryServices.deleteCategory(id);
  sendResponse(res, {
    message: "Category deleted successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
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
