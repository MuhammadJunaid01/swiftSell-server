import { Document, Types } from "mongoose";
export type DealType = "day" | "week" | "month" | "flashSale";

export interface IDeal extends Document {
  dealThumbnail: string; // Thumbnail image for the deal
  dealTitle: string; // Title of the deal
  products: {
    productId: Types.ObjectId;
    discount: number;
    categoryId: Types.ObjectId;
  }[];
  dealStartDate: Date; // Start date for the deal
  dealEndDate: Date; // End date for the deal
  discountType: "percentage" | "fixed"; // Type of discount applied
  discountValue: number; // Value of the discount
  isActive: boolean; // Whether the deal is active or not
  createdAt: Date; // Timestamp for when the deal was created
  updatedAt: Date; // Timestamp for when the deal was last updated
  dealType: DealType;
}
