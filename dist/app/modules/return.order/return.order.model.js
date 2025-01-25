"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRequestModel = void 0;
const mongoose_1 = require("mongoose");
const ReturnRequestSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
            reason: { type: String, required: true },
            uploadedImages: [{ type: String }],
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Completed"],
        default: "Pending",
    },
    refundAmount: { type: Number, required: true },
    refundTransactionId: { type: String },
    createdAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
    notes: { type: String },
    reason: { type: String },
});
exports.ReturnRequestModel = (0, mongoose_1.model)("ReturnRequest", ReturnRequestSchema);
