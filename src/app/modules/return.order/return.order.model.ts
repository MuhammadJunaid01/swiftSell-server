import mongoose, { model, Model, Schema } from "mongoose";
import { IReturnRequest } from "./return.order.interface";

const ReturnRequestSchema: Schema = new Schema<IReturnRequest>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
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

export const ReturnRequestModel = model<IReturnRequest>(
  "ReturnRequest",
  ReturnRequestSchema
);
