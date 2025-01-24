"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodValidation = exports.PaymentMethodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.PaymentMethodSchema = zod_1.z.object({
    user: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
    paymentType: zod_1.z.enum(["card", "stripe", "paypal", "cod"]),
    cardNumber: zod_1.z.string().optional(),
    cardHolderName: zod_1.z.string().optional(),
    expirationDate: zod_1.z.string().optional(),
    cvv: zod_1.z.string().optional(),
    billingAddress: zod_1.z.string().optional(),
    stripeCustomerId: zod_1.z.string().optional(),
    paypalEmail: zod_1.z.string().optional(),
    isDefault: zod_1.z.boolean().optional(),
});
exports.paymentMethodValidation = zod_1.z.object({
    body: exports.PaymentMethodSchema,
});
