import { Request, Response } from "express";
import { paginationOption } from "../../../shared/constant";
import pick from "../../../shared/pick";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { CategoryFilterableFields } from "../category/category.constant";
import { DeviceType } from "./product.interface";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const response = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    message: "Product created successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.CREATED,
  });
});

const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
  const paginationOptions = pick(_req.query, paginationOption);
  const filters = pick(_req.query, CategoryFilterableFields);
  const response = await ProductServices.getAllProducts(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    message: "Products fetched successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.getProductById(id);
  sendResponse(res, {
    message: "Product fetched successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.updateProduct(id, req.body);
  sendResponse(res, {
    message: "Product updated successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.deleteProduct(id);
  sendResponse(res, {
    message: "Product deleted successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});
const viewProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProductServices.updateProductViews(
    id,
    req?.deviceType as DeviceType
  );
  sendResponse(res, {
    message: "Product view updated successfully",
    success: true,
    data: response,
    statusCode: StatusCodes.OK,
  });
});
const addProductProductImages = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { images } = req.body;
    const response = await ProductServices.updateProductImages(id, images);
    sendResponse(res, {
      message: "updated Product images  successfully",
      success: true,
      data: response,
      statusCode: StatusCodes.OK,
    });
  }
);

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  viewProduct,
  addProductProductImages,
};
