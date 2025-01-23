// models/paymentMethodModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { PaymentMethod } from "./payment.interface";

export interface IPaymentMethod extends PaymentMethod, Document {}

const paymentMethodSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cardNumber: { type: String, required: true },
  cardHolderName: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  billingAddress: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

export const PaymentMethodModel = mongoose.model<IPaymentMethod>(
  "PaymentMethod",
  paymentMethodSchema
);
