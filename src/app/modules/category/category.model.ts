import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
