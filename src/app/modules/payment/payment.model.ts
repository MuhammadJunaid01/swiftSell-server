// models/paymentMethodModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { PaymentMethod } from "./payment.interface";

export interface IPaymentMethod extends PaymentMethod, Document {}

const paymentMethodSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentType: {
      type: String,
      enum: ["card", "stripe", "paypal", "cod"],
      required: true,
    },
    cardNumber: { type: String },
    cardHolderName: { type: String },
    expirationDate: { type: String },
    cvv: { type: String },
    billingAddress: { type: String },
    stripeCustomerId: { type: String },
    paypalEmail: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const PaymentMethodModel = mongoose.model<IPaymentMethod>(
  "PaymentMethod",
  paymentMethodSchema
);
