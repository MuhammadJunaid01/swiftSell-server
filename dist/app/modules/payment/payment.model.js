"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/payment.model.ts
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: true },
    method: {
        type: String,
        enum: ["Stripe", "PayPal", "CashOnDelivery"],
        required: true,
    },
    amount: { type: Number, required: true },
    transactionId: { type: String }, // Optional for COD
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending",
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});
const Payment = (0, mongoose_1.model)("Payment", PaymentSchema);
exports.default = Payment;
