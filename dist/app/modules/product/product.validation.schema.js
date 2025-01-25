"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
// productSchemas.ts
const zod_1 = require("zod");
const ProductSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Name is required"), // Name should be a string and required
    mainImage: zod_1.z.string().min(1, "Main image is required"), // Main image should be a string and required
    description: zod_1.z.string().min(1, "Description is required"), // Description should be a string and required
    price: zod_1.z.number().min(0, "Price must be a positive number"), // Price should be a positive number
    category: zod_1.z.string({ required_error: "Invalid category ID" }), // Category should be a valid UUID string
    subCategory: zod_1.z.string({ required_error: "Invalid subcategory ID" }), // SubCategory is optional but should be a valid UUID
    images: zod_1.z.array(zod_1.z.string()).optional(), // Images is an optional array of strings
    averageRating: zod_1.z.number().min(0).max(5).default(0), // Rating should be between 0 and 5, with a default of 0
    reviewCount: zod_1.z.number().min(0).default(0), // Review count should be non-negative, defaulting to 0
    reviews: zod_1.z
        .array(zod_1.z.string({ required_error: "Invalid review ID" }))
        .optional(), // Reviews is an optional array of valid UUIDs
    discount: zod_1.z
        .object({
        type: zod_1.z.enum(["percentage", "fixed"]),
        value: zod_1.z.number().min(0).optional(),
        validFrom: zod_1.z.date().optional(),
        validTo: zod_1.z.date().optional(),
    })
        .optional(), // Discount is an optional object with specific fields
    inventory: zod_1.z
        .object({
        stock: zod_1.z.number().min(0, "Stock must be a non-negative number"),
        reservedStock: zod_1.z.number().min(0).default(0),
        sku: zod_1.z.string().min(1, "SKU is required"),
        warehouseLocation: zod_1.z.string().optional(),
    })
        .required(),
    isDeal: zod_1.z.boolean().default(false), // Deal flag with a default of false
    dealType: zod_1.z.enum(["day", "week", "month"]).optional(), // Optional deal type field
    dealExpiry: zod_1.z.date().optional(), // Optional expiry date for deals
    tags: zod_1.z.array(zod_1.z.string()).default([]), // Optional tags array, default is empty
    searchableTags: zod_1.z.array(zod_1.z.string()).default([]), // Optional searchable tags array, default is empty
    shippingDetails: zod_1.z
        .object({
        weight: zod_1.z.number().min(0),
        dimensions: zod_1.z.object({
            length: zod_1.z.number().nonnegative(),
            width: zod_1.z.number().nonnegative(),
            height: zod_1.z.number().nonnegative(),
        }),
        shippingClass: zod_1.z.enum(["standard", "express", "priority"]),
        deliveryEstimate: zod_1.z.string().min(1, "Delivery estimate is required"),
    })
        .required(),
    views: zod_1.z.number().default(0), // Default views to 0
    isActive: zod_1.z.boolean().default(true), // Default to active product
    metaTitle: zod_1.z.string().trim().optional(),
    metaDescription: zod_1.z.string().trim().optional(),
    deletedAt: zod_1.z.date().nullable().default(null), // Date when product is deleted, default is null
    sizes: zod_1.z.array(zod_1.z.string()).min(1, "At least one size is required"), // Sizes should be an array of strings
    availableSizes: zod_1.z
        .array(zod_1.z.string())
        .min(1, "At least one available size is required"), // Available sizes should also be an array of strings
    color: zod_1.z.string().min(1, "Color is required"), // Color is a required field
    colors: zod_1.z.array(zod_1.z.string()).min(1, "At least one color is required"), // Colors should be an array of strings
});
exports.productValidation = zod_1.z.object({
    body: ProductSchema,
});
