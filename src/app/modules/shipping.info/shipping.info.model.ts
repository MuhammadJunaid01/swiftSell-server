import mongoose, { Document, Schema } from "mongoose";
import { AppError } from "../../errors/globalError";
import { AddressType, ShippingInfo } from "./shipping.info.interface";

export interface IShippingInfo extends ShippingInfo, Document {}

const shippingInfoSchema: Schema = new Schema<IShippingInfo>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 8, maxlength: 14 },
    deliveryInstructions: { type: String },
    location: { longitude: Number, latitude: Number },
    addressType: {
      type: String,
      enum: Object.values(AddressType),
      required: true,
    },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Pre-save hook to enforce one default address and a maximum of three addresses
shippingInfoSchema.pre("save", async function (next) {
  const currentDoc = this as unknown as IShippingInfo;

  // Check if the user already has three addresses
  const userAddresses = await mongoose.models.ShippingInfo.find({
    user: currentDoc.user,
  });

  if (userAddresses.length >= 3 && currentDoc.isNew) {
    return next(new AppError("A user cannot have more than 3 addresses.", 400));
  }

  // Check if the user is trying to set more than one default address
  if (currentDoc.isDefault) {
    const existingDefault = await mongoose.models.ShippingInfo.findOne({
      user: currentDoc.user,
      isDefault: true,
      _id: { $ne: currentDoc._id }, // Exclude the current document if updating
    });

    if (existingDefault) {
      return next(
        new AppError("Only one address can be set as default at a time.", 400)
      );
    }
  }

  next();
});

export const ShippingInfoModel = mongoose.model<IShippingInfo>(
  "ShippingInfo",
  shippingInfoSchema
);
