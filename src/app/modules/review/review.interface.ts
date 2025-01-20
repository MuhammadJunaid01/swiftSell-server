import { Types } from "mongoose";

export interface IReview {
  _id?: Types.ObjectId;
  user: Types.ObjectId; // Reference to the User schema
  product: Types.ObjectId; // Reference to the Product schema
  rating: number; // Rating between 1-5
  reviewText?: string; // Optional review text
  attachments?: string[]; // Array of attachment URLs
  isApproved: boolean; // Flag for moderation
  isDeleted: boolean; // Soft delete flag
  helpfulCount?: number; // Number of helpful votes
  createdAt?: Date;
  updatedAt?: Date;
}
