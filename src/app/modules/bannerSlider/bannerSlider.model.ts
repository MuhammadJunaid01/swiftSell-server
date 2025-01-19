import { Schema, model } from "mongoose";
import { IBannerSlider } from "./bannerSlider.interface";

const BannerSliderSchema = new Schema<IBannerSlider>(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    redirectUrl: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, required: false, unique: true },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

export const BannerSlider = model<IBannerSlider>(
  "BannerSlider",
  BannerSliderSchema
);
