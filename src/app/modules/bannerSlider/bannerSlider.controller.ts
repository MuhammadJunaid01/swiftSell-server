import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import * as bannerSliderService from "./bannerSlider.service";

export const createBanner = catchAsync(async (req: Request, res: Response) => {
  const banner = await bannerSliderService.createBanner(req.body);
  sendResponse(res, {
    success: true,
    message: "Banner created successfully",
    data: banner,
    statusCode: StatusCodes.CREATED,
  });
});

export const getBanners = catchAsync(async (req: Request, res: Response) => {
  const banners = await bannerSliderService.getBanners();
  sendResponse(res, {
    success: true,
    message: "Banners fetched successfully",
    data: banners,
    statusCode: StatusCodes.OK,
  });
});

export const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBanner = await bannerSliderService.updateBanner(id, req.body);
  sendResponse(res, {
    success: true,
    message: "Banner updated successfully",
    data: updatedBanner,
    statusCode: StatusCodes.OK,
  });
});

export const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await bannerSliderService.deleteBanner(id);
  sendResponse(res, {
    success: true,
    message: "Banner deleted successfully",
    data: bannerSliderService,
    statusCode: StatusCodes.OK,
  });
});
