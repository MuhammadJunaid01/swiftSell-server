import { z } from "zod";

const subCategorySchema = z.object({
  categoryId: z.string({ required_error: "category id is required" }),
  name: z.string({ required_error: "category name is required" }),
});
export const subCategoryValidation = z.object({
  body: subCategorySchema,
});
