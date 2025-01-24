import { Types } from "mongoose";
import { z } from "zod";

export const ShippingInfoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  deliveryInstructions: z.string().optional(),
  isDefault: z.boolean().optional(),
  user: z.instanceof(Types.ObjectId),
});
export const shippingInfoValidationSchema = z.object({
  body: ShippingInfoSchema,
});
