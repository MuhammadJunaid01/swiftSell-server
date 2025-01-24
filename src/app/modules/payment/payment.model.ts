// models/payment.model.ts
import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
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
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Payment = model<IPayment>("Payment", PaymentSchema);

export default Payment;
