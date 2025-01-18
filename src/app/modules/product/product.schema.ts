import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["fashion", "electronics", "appliances", "beauty", "furniture"],
    },
    subCategory: {
      name: { type: String },
      description: { type: String },
    },
    images: { type: [String], required: true },
    ratings: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    discount: {
      type: {
        type: { type: String, enum: ["percentage", "fixed"] },
        value: { type: Number },
        validFrom: { type: Date },
        validTo: { type: Date },
      },
      required: false,
    },
    inventory: {
      stock: { type: Number, required: true },
      sku: { type: String, required: true },
      warehouseLocation: { type: String },
    },
    isDeal: { type: Boolean, required: true },
    dealType: { type: String, enum: ["day", "week", "month"], required: false },
    dealExpiry: { type: Date },
    tags: { type: [String] },
    shippingDetails: {
      weight: { type: Number, required: true },
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      shippingClass: {
        type: String,
        enum: ["standard", "express", "priority"],
        required: true,
      },
      deliveryEstimate: { type: String, required: true },
    },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
