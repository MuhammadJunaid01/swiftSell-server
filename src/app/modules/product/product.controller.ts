import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const response = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    message: "Product created successfully",
    success: true,
    data: response,
    statusCode: httpStatus.CREATED,
  });
});

const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
  const response = await ProductServices.getAllProducts();
  sendResponse(res, {
    message: "Products fetched successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.getProductById(id);
  sendResponse(res, {
    message: "Product fetched successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.updateProduct(id, req.body);
  sendResponse(res, {
    message: "Product updated successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.deleteProduct(id);
  sendResponse(res, {
    message: "Product deleted successfully",
    success: true,
    data: response,
    statusCode: httpStatus.OK,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
