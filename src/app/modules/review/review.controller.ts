import { Request, Response } from "express";
import httpStatus from "http-status";
import { CustomRequest } from "../../interfaces";
import catchAsync from "../../lib/utils/catchAsync";
import * as ReviewService from "./review.service";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await ReviewService.createReview(req.body);
  res.status(httpStatus.CREATED).json({ success: true, data: review });
});

export const getProductReviews = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const reviews = await ReviewService.getReviewsForProduct(productId);
    res.status(httpStatus.OK).json({ success: true, data: reviews });
  }
);

export const deleteReview = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { reviewId } = req.params;
    const userId = req?.user?._id as string; // Assume `req.user` contains authenticated user ID
    await ReviewService.deleteReview(reviewId, userId);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Review deleted successfully" });
  }
);

export const approveReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const review = await ReviewService.approveReview(reviewId);
  res.status(httpStatus.OK).json({ success: true, data: review });
});
