import mongoose, { model, Query, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mainImage: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
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
    isDeal: { type: Boolean, default: false },
    dealType: { type: String, enum: ["day", "week", "month"] },
    dealExpiry: { type: Date },
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
    views: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    deletedAt: { type: Date, default: null },
    sizes: { type: [String], required: true },
    availableSizes: { type: [String], required: true },
    color: { type: String, required: true },
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
    id: productId,
  });
  if (existingProduct) {
    return generateUniqueProductId();
  }
  return productId;
}

ProductSchema.pre<IProduct>("save", async function (next) {
  if (!this.id) {
    this.id = await generateUniqueProductId();
  }
  next();
});

// Soft delete and filtering for active products
ProductSchema.pre<Query<any, IProduct>>(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

export const Product = model<IProduct>("Product", ProductSchema);
