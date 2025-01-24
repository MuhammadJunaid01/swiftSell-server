"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingInfoValidationSchema = exports.ShippingInfoSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ShippingInfoSchema = zod_1.z.object({
    address: zod_1.z.string().min(1, "Address is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    postalCode: zod_1.z.string().min(1, "Postal Code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    phoneNumber: zod_1.z.string().min(1, "Phone Number is required"),
    deliveryInstructions: zod_1.z.string().optional(),
    isDefault: zod_1.z.boolean().optional(),
    user: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
});
exports.shippingInfoValidationSchema = zod_1.z.object({
    body: exports.ShippingInfoSchema,
});
