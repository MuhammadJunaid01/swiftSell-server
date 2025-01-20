import mongoose, { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
    attachments: [{ type: String }],
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Review = model<IReview>("Review", ReviewSchema);
