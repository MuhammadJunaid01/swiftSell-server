import { Document, Types } from "mongoose";

export interface ISubCategory extends Document {
  category: Types.ObjectId;
  name: string;
}
