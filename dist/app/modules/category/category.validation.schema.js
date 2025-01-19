"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }),
});
exports.categoryValidation = zod_1.z.object({
    body: categorySchema,
});
