"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryValidation = void 0;
const zod_1 = require("zod");
const subCategorySchema = zod_1.z.object({
    categoryId: zod_1.z.string({ required_error: "category id is required" }),
    name: zod_1.z.string({ required_error: "category name is required" }),
});
exports.subCategoryValidation = zod_1.z.object({
    body: subCategorySchema,
});
