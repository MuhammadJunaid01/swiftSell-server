// productSchemas.ts
import { z } from "zod";
import { CategoryType } from "./product.interface";

export const subCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const discountSchema = z.object({
  type: z.enum(["percentage", "fixed"]),
  value: z.number(),
  validFrom: z.date(),
  validTo: z.date(),
});

export const inventorySchema = z.object({
  stock: z.number(),
  sku: z.string(),
  warehouseLocation: z.string().optional(),
});

export const shippingDetailsSchema = z.object({
  weight: z.number(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  shippingClass: z.enum(["standard", "express", "priority"]),
  deliveryEstimate: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(Object.values(CategoryType) as [string, ...string[]]),
  subCategory: subCategorySchema.optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string(),
  ratings: z.number(),
  reviews: z.array(z.string()).optional(),
  discount: discountSchema.optional(),
  inventory: inventorySchema,
  isDeal: z.boolean(),
  dealType: z.enum(["day", "week", "month"]).optional(),
  dealExpiry: z.date().optional(),
  tags: z.array(z.string()).optional(),
  shippingDetails: shippingDetailsSchema,
  isActive: z.boolean(),
});
