import { z } from "zod";

const categorySchema = z.object({
  name: z.string({ required_error: "name is required" }),
});
export const categoryValidation = z.object({
  body: categorySchema,
});
