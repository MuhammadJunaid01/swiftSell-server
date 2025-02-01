import mongoose, { model, Query, Schema } from "mongoose";
import { IProduct, IProductDetails } from "./product.interface";

// Product Details Schema
const ProductDetailsSchema = new Schema<IProductDetails>(
  {
    material: { type: String }, // Common for most products
    brand: { type: String, required: true }, // Mandatory for all categories
    careInstructions: { type: [String] }, // Optional; relevant for apparel, electronics, etc.
    originCountry: { type: String }, // Common for most products
    fitType: {
      type: String,
      enum: ["regular", "slim", "relaxed", "compact", "oversized"],
      default: "regular",
    }, // Specific to clothing, furniture, or similar categories
    occasion: {
      type: String,
      enum: [
        "casual",
        "formal",
        "party",
        "sports",
        "daily use",
        "business",
        "travel",
        "home",
      ],
    }, // Context-based usage
    pattern: { type: String }, // Design patterns (e.g., "striped", "solid")
    features: { type: [String] }, // Additional features (e.g., "waterproof", "portable")
    warranty: {
      type: String,
      default: "No warranty",
    }, // Product warranty information
    dimensions: { type: String }, // Physical dimensions for products like electronics, furniture
    weight: { type: Number }, // Weight in kg or grams
    additionalDetails: {
      type: Map,
      of: String,
    }, // Customizable key-value pairs
    categorySpecific: {
      type: Map,
      of: Schema.Types.Mixed,
    }, // Dynamic fields based on the category
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
        type: String, // Define `type` directly within the object
        enum: ["percentage", "fixed"], // Enum for allowed types
      },
      value: { type: Number }, // Discount value
      validFrom: { type: Date }, // Discount valid-from date
      validTo: { type: Date }, // Discount valid-to date
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
