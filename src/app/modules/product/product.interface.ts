import { Document, Types } from "mongoose";

export interface IDiscount {
  type: "percentage" | "fixed";
  value: number;
  validFrom: Date;
  validTo: Date;
}

export interface IInventory {
  stock: number;
  reservedStock?: number;
  sku: string;
  warehouseLocation?: string;
}

export interface IDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IShippingDetails {
  weight: number;
  dimensions: IDimensions;
  shippingClass: "standard" | "express" | "priority";
  deliveryEstimate: string;
}
type Sizes = "xs" | "s" | "m" | "l" | "xl" | "xxl";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  mainImage: string; //this is main product  image for display
  category: Types.ObjectId;
  subCategory?: Types.ObjectId;
  images?: string[]; //this images will be  display when use details product details as slider
  averageRating: number;
  reviewCount: number;
  reviews: Types.ObjectId[];
  discount?: IDiscount;
  inventory: IInventory;
  isDeal?: boolean;
  dealType?: "day" | "week" | "month" | "flashSale";
  dealExpiry?: Date;
  tags?: string[];
  searchableTags?: string[];
  shippingDetails: IShippingDetails;
  views: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  deletedAt?: Date;
  color: string;
  sizes: Sizes[];
  availableSizes: Sizes[];
  colors: string[];
}
