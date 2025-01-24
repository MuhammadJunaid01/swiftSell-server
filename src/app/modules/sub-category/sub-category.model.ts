import mongoose, { Schema, model } from "mongoose";
import { ISubCategory } from "./sub-category.interface";

// Schema Definition
const SubCategorySchema: Schema<ISubCategory> = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

// Pre-save validation to ensure parent category exists
SubCategorySchema.pre<ISubCategory>("save", async function (next) {
  const categoryExists = await mongoose.models.Category.findById(this.category);
  if (!categoryExists) {
    throw new Error("Invalid parent category ID.");
  }
  next();
});

const SubCategory = model<ISubCategory>("SubCategory", SubCategorySchema);

export default SubCategory;
