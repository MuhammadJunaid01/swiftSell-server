// models/shippingInfoModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { ShippingInfo } from "./shipping.info.interface";

export interface IShippingInfo extends ShippingInfo, Document {}

const shippingInfoSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  deliveryInstructions: { type: String },
  isDefault: { type: Boolean, default: false },
});

export const ShippingInfoModel = mongoose.model<IShippingInfo>(
  "ShippingInfo",
  shippingInfoSchema
);
