import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IReview extends Document {
  user: IUser["_id"]; // Reference to User
  rating: number;
  reviewText?: string;
  createdAt: Date;
}
