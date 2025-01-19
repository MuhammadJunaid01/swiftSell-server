import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/utils/catchAsync";
import * as bannerSliderService from "./bannerSlider.service";

export const createBanner = catchAsync(async (req: Request, res: Response) => {
  const banner = await bannerSliderService.createBanner(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Banner created successfully",
    data: banner,
  });
});

export const getBanners = catchAsync(async (req: Request, res: Response) => {
  const banners = await bannerSliderService.getBanners();
  res.status(httpStatus.OK).json({
    success: true,
    message: "Banners fetched successfully",
    data: banners,
  });
});

export const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBanner = await bannerSliderService.updateBanner(id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Banner updated successfully",
    data: updatedBanner,
  });
});

export const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await bannerSliderService.deleteBanner(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Banner deleted successfully",
  });
});
