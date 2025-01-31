// productSchemas.ts
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"), // Name should be a string and required
  mainImage: z.string().min(1, "Main image is required"), // Main image should be a string and required
  description: z.string().min(1, "Description is required"), // Description should be a string and required
  price: z.number().min(0, "Price must be a positive number"), // Price should be a positive number
  category: z.string({ required_error: "Invalid category ID" }), // Category should be a valid UUID string
  subCategory: z.string({ required_error: "Invalid subcategory ID" }), // SubCategory is optional but should be a valid UUID
  images: z.array(z.string()).optional(), // Images is an optional array of strings
  averageRating: z.number().min(0).max(5).default(0), // Rating should be between 0 and 5, with a default of 0
  reviewCount: z.number().min(0).default(0), // Review count should be non-negative, defaulting to 0
  reviews: z
    .array(z.string({ required_error: "Invalid review ID" }))
    .optional(), // Reviews is an optional array of valid UUIDs
  discount: z
    .object({
      type: z.enum(["percentage", "fixed"]),
      value: z.number().min(0).optional(),
      validFrom: z.date().optional(),
      validTo: z.date().optional(),
    })
    .optional(), // Discount is an optional object with specific fields
  inventory: z
    .object({
      stock: z.number().min(0, "Stock must be a non-negative number"),
      reservedStock: z.number().min(0).default(0),
      sku: z.string().min(1, "SKU is required"),
      warehouseLocation: z.string().optional(),
    })
    .required(),
  isDeal: z.boolean().default(false), // Deal flag with a default of false
  dealType: z.enum(["day", "week", "month"]).optional(), // Optional deal type field
  dealExpiry: z.date().optional(), // Optional expiry date for deals
  tags: z.array(z.string()).default([]), // Optional tags array, default is empty
  searchableTags: z.array(z.string()).default([]), // Optional searchable tags array, default is empty
  shippingDetails: z
    .object({
      weight: z.number().min(0),
      dimensions: z.object({
        length: z.number().nonnegative(),
        width: z.number().nonnegative(),
        height: z.number().nonnegative(),
      }),
      shippingClass: z.enum(["standard", "express", "priority"]),
      deliveryEstimate: z.string().min(1, "Delivery estimate is required"),
    })
    .required(),
  views: z.number().default(0), // Default views to 0
  isActive: z.boolean().default(true), // Default to active product
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  deletedAt: z.date().nullable().default(null), // Date when product is deleted, default is null
  size: z.string({ required_error: "At least one size is required" }), // Sizes should be an array of strings
  availableSizes: z
    .array(z.string())
    .min(1, "At least one available size is required"), // Available sizes should also be an array of strings
  color: z.string().min(1, "Color is required"), // Color is a required field
  colors: z.array(z.string()).min(1, "At least one color is required"), // Colors should be an array of strings
});
export const createDealSchema = z.object({
  productId: z.string({ required_error: "Product ID is required" }),
  dealType: z
    .string({ required_error: "Deal type is required" })
    .refine((value) => ["day", "week", "month", "flashSale"].includes(value), {
      message:
        "Invalid deal type. Valid values are 'day', 'week', 'month', or 'flashSale'.",
    }),
  dealExpiry: z
    .string({ required_error: "Deal expiry date is required" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format for deal expiry.",
    }),
});
export const productValidation = z.object({
  body: ProductSchema,
});
export const createProductDealValidation = z.object({
  body: createDealSchema,
});
