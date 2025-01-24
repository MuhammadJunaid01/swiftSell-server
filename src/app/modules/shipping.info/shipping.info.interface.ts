import { Types } from "mongoose";
type Location = {
  latitude: number; // Latitude of the location
  longitude: number; // Longitude of the location
};

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
  location?: Location;
}
