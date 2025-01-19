"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
    attachments: [{ type: String }],
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)("Review", ReviewSchema);
