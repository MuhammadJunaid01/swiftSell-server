import { Document, Types } from "mongoose";

export type DeviceType = "mobile" | "desktop" | "tablet";
export interface IDiscount {
  type: "percentage" | "fixed";
  value: number;
  validFrom: Date;
  validTo: Date;
}
export interface IProductDetails {
  material?: string; // Material of the product (e.g., Cotton, Polyester, Metal)
  brand: string; // Brand name
  careInstructions?: string[]; // Care instructions for the product
  originCountry?: string; // Country where the product was made
  fitType?: "regular" | "slim" | "relaxed" | "compact" | "oversized"; // Fit type, extended for versatility
  occasion?:
    | "casual"
    | "formal"
    | "party"
    | "sports"
    | "daily use"
    | "business"
    | "travel"
    | "home"; // Suitable occasions
  pattern?: string; // Pattern (e.g., solid, striped, checked)
  features?: string[]; // Additional features (e.g., waterproof, lightweight)
  warranty?: string; // Warranty information (e.g., "2 years", "No warranty")
  dimensions?: string; // Dimensions of the product (e.g., "10x10x5 inches")
  weight?: number; // Weight in kg or grams
  additionalDetails?: Record<string, string>; // Additional key-value details
  categorySpecific?: Record<string, any>; // Category-specific fields (dynamic structure)
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
  mainImage: string; // Main product image for display
  category: Types.ObjectId;
  subCategory?: Types.ObjectId;
  images?: string[]; // Images to display as a slider for product details
  averageRating: number;
  reviewCount: number;
  reviews: Types.ObjectId[];
  discount?: IDiscount; // Optional discount information
  inventory: IInventory;
  tags?: string[];
  searchableTags?: string[];
  shippingDetails: IShippingDetails;
  views: {
    total: number; // Total views across all devices
    mobile: number; // Views from mobile devices
    desktop: number; // Views from desktop devices
    tablet: number; // Views from tablet devices
    recent: { date: Date; count: number }[]; // Recent views
  };
  purchase: number;
  isDeleted: boolean;
  metaTitle?: string;
  metaDescription?: string;
  deletedAt?: Date;
  color: string;
  size: Sizes;
  availableSizes: Sizes[];
  colors: string[];
  productDetails: IProductDetails;
  productId: string;
  isDeal: boolean;
}
