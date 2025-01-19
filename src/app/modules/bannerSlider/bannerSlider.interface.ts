import { Document } from "mongoose";

export interface IBannerSlider extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  redirectUrl?: string;
  isActive: boolean;
  displayOrder: number;
}
