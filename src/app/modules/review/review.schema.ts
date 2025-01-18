import mongoose, { Schema } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema: Schema<IReview> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: false },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
