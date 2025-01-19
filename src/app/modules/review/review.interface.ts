import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IReview extends Document {
  user: Types.ObjectId; // Reference to User
  rating: number;
  reviewText?: string;
  createdAt: Date;
  productId: Types.ObjectId;
}
