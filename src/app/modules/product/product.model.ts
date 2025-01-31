import mongoose, { model, Query, Schema } from "mongoose";
import { IProduct, IProductDetails } from "./product.interface";

// Product Details Schema
const ProductDetailsSchema = new Schema<IProductDetails>(
  {
    material: { type: String, required: true },
    brand: { type: String, required: true },
    careInstructions: { type: [String], required: true },
    originCountry: { type: String, required: true },
    fitType: { type: String, enum: ["regular", "slim", "relaxed"] },
    occasion: { type: String, enum: ["casual", "formal", "party", "sports"] },
    pattern: { type: String },
  },
  { _id: false }
);

// Product Schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mainImage: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    productId: { type: String },
    isDeal: { type: Boolean, default: false },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    images: { type: [String] },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    discount: {
      type: {
        type: { type: String, enum: ["percentage", "fixed"] },
        value: { type: Number },
        validFrom: { type: Date },
        validTo: { type: Date },
      },
    },
    inventory: {
      stock: { type: Number, required: true },
      reservedStock: { type: Number, default: 0 },
      sku: { type: String, required: true, unique: true },
      warehouseLocation: { type: String },
    },
    tags: { type: [String], default: [] },
    searchableTags: { type: [String], default: [] },
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
    purchase: { type: Number, default: 0 },
    views: {
      total: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
      desktop: { type: Number, default: 0 },
      tablet: { type: Number, default: 0 },
    },
    isDeleted: { type: Boolean, default: false },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    deletedAt: { type: Date, default: null },
    size: { type: String, required: true },
    availableSizes: { type: [String], required: true },
    color: { type: String, required: true },
    colors: { type: [String], required: true },
    productDetails: { type: ProductDetailsSchema, required: true },
  },
  { timestamps: true }
);

// Middleware to validate category existence
ProductSchema.pre<IProduct>("save", async function (next) {
  const categoryExists = await mongoose.models.Category.findById(this.category);
  if (!categoryExists) {
    throw new Error("Invalid category ID");
  }
  next();
});

// Middleware to generate a unique product ID
async function generateUniqueProductId(): Promise<string> {
  const productId = Math.floor(10000000 + Math.random() * 90000000).toString();
  const existingProduct = await mongoose.models.Product.findOne({
    productId: productId,
  });
  if (existingProduct) {
    return generateUniqueProductId();
  }
  return productId;
}

ProductSchema.pre<IProduct>("save", async function (next) {
  if (!this.productId) {
    this.productId = await generateUniqueProductId();
  }
  next();
});

// Soft delete and filtering for active products
ProductSchema.pre<Query<any, IProduct>>(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

export const Product = model<IProduct>("Product", ProductSchema);
