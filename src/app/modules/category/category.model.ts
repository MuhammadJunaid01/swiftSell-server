import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: false, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
