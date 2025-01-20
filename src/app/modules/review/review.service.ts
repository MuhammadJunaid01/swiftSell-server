import httpStatus from "http-status";
import { AppError } from "../../errors/globalError";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

export const createReview = async (reviewData: IReview): Promise<IReview> => {
  const review = await Review.create(reviewData);
  return review;
};

export const getReviewsForProduct = async (
  productId: string
): Promise<IReview[]> => {
  return await Review.find({
    product: productId,
    isDeleted: false,
    isApproved: true,
  }).populate("user", "name profileImage");
};

export const deleteReview = async (
  reviewId: string,
  userId: string
): Promise<void> => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError("Review not found", httpStatus.NOT_FOUND);
  }
  if (review.user.toString() !== userId) {
    throw new AppError(
      "Unauthorized to delete this review",
      httpStatus.FORBIDDEN
    );
  }
  review.isDeleted = true;
  await review.save();
};

export const approveReview = async (
  reviewId: string
): Promise<IReview | null> => {
  return await Review.findByIdAndUpdate(
    reviewId,
    { isApproved: true },
    { new: true }
  );
};
