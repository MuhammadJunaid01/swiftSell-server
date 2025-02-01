import mongoose, { Schema, model } from "mongoose";
import { IDeal } from "./deal.interface";

const dealSchema = new Schema<IDeal>(
  {
    dealThumbnail: {
      type: String,
      required: [true, "Deal thumbnail is required"],
    },
    dealTitle: {
      type: String,
      required: [true, "Deal title is required"],
      trim: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        discount: {
          type: Number,
          required: true,
        },
      },
    ],
    dealStartDate: {
      type: Date,
      required: [true, "Deal start date is required"],
    },
    dealEndDate: {
      type: Date,
      required: [true, "Deal end date is required"],
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Discount type is required"],
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount value cannot be less than 0"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    dealType: {
      type: String,
      enum: ["day", "week", "month", "flashSale"],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Deal = model<IDeal>("Deal", dealSchema);
