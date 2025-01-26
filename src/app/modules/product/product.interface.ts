import { Document, Types } from "mongoose";
export type DeviceType = "mobile" | "desktop" | "tablet";
export interface IDiscount {
  type: "percentage" | "fixed";
  value: number;
  validFrom: Date;
  validTo: Date;
}
export interface IProductDetails {
  material: string; // Material of the product (e.g., Cotton, Polyester)
  brand: string; // Brand name
  careInstructions: string[]; // Care instructions for the product
  originCountry: string; // Country where the product was made
  fitType?: "regular" | "slim" | "relaxed"; // Fit type
  occasion?: "casual" | "formal" | "party" | "sports"; // Suitable occasion
  pattern?: string; // Pattern (e.g., solid, striped, checked)
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
  views: {
    total: number; // Total views across all devices
    mobile: number; // Views from mobile devices
    desktop: number; // Views from desktop devices
    tablet: number; // Views from tablet devices
  };
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  deletedAt?: Date;
  color: string;
  size: Sizes;
  availableSizes: Sizes[];
  colors: string[];
  productDetails: IProductDetails;
}
