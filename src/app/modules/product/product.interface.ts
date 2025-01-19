import { Types } from "mongoose";
import { IReview } from "../review/review.interface";

// Category and Subcategory Types
export enum CategoryType {
  Fashion = "fashion",
  Electronics = "electronics",
  Appliances = "appliances",
  Beauty = "beauty",
  Furniture = "furniture",
}

export interface SubCategory {
  name: string;
  description?: string;
}

// Discount Type
export interface Discount {
  type: "percentage" | "fixed"; // Type of discount
  value: number; // Discount value
  validFrom: Date; // Start date of the discount
  validTo: Date; // End date of the discount
}

// Inventory Details
export interface Inventory {
  stock: number; // Number of items in stock
  sku: string; // Stock Keeping Unit (SKU)
  warehouseLocation?: string; // Optional location of the warehouse
}

// Deal Type Enum
export enum DealType {
  Day = "day",
  Week = "week",
  Month = "month",
}

// Shipping Details
export interface ShippingDetails {
  weight: number; // Weight of the product in kilograms
  dimensions: {
    length: number;
    width: number;
    height: number;
  }; // Dimensions of the product
  shippingClass: "standard" | "express" | "priority"; // Shipping class
  deliveryEstimate: string; // Estimated delivery time (e.g., "3-5 days")
}

// Product Interface
export interface IProduct {
  id: string; // Unique product ID
  name: string; // Product name
  description: string; // Detailed product description
  price: number; // Product price
  category: Types.ObjectId; // Main product category
  subCategory?: SubCategory; // Optional subcategory
  images?: string[]; // Array of image URLs
  thumbnail: string; // Optional URL for the main thumbnail image
  ratings?: number; // Average rating of the product
  reviews?: IReview[]; // Array of reviews
  discount?: Discount; // Optional discount details
  inventory: Inventory; // Inventory details
  isDeal: boolean; // Whether the product is part of a special deal
  dealType?: DealType; // Type of deal (day, week, month)
  dealExpiry?: Date; // Deal expiry date
  tags?: string[]; // Tags for the product (e.g., "summer", "new")
  shippingDetails: ShippingDetails; // Shipping-related details
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
  isActive: boolean; // Whether the product is active on the platform
  views: number;
  averageRating: number;
  reviewCount: number;
  searchableTags: string[];
  metaTitle: string;
  metaDescription: string;
  deletedAt: Date;
}
