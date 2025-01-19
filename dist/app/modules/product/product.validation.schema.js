"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.shippingDetailsSchema = exports.inventorySchema = exports.discountSchema = exports.subCategorySchema = void 0;
// productSchemas.ts
const zod_1 = require("zod");
exports.subCategorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
exports.discountSchema = zod_1.z.object({
    type: zod_1.z.enum(["percentage", "fixed"]),
    value: zod_1.z.number(),
    validFrom: zod_1.z.date(),
    validTo: zod_1.z.date(),
});
exports.inventorySchema = zod_1.z.object({
    stock: zod_1.z.number(),
    sku: zod_1.z.string(),
    warehouseLocation: zod_1.z.string().optional(),
});
exports.shippingDetailsSchema = zod_1.z.object({
    weight: zod_1.z.number(),
    dimensions: zod_1.z.object({
        length: zod_1.z.number(),
        width: zod_1.z.number(),
        height: zod_1.z.number(),
    }),
    shippingClass: zod_1.z.enum(["standard", "express", "priority"]),
    deliveryEstimate: zod_1.z.string(),
});
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    subCategory: exports.subCategorySchema.optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    thumbnail: zod_1.z.string(),
    ratings: zod_1.z.number(),
    reviews: zod_1.z.array(zod_1.z.string()).optional(),
    discount: exports.discountSchema.optional(),
    inventory: exports.inventorySchema,
    isDeal: zod_1.z.boolean(),
    dealType: zod_1.z.enum(["day", "week", "month"]).optional(),
    dealExpiry: zod_1.z.date().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    shippingDetails: exports.shippingDetailsSchema,
    isActive: zod_1.z.boolean(),
});
