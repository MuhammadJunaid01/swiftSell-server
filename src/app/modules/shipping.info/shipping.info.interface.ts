import { Types } from "mongoose";

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  deliveryInstructions?: string; // Optional
  isDefault?: boolean; // Optional
  user: Types.ObjectId;
}
