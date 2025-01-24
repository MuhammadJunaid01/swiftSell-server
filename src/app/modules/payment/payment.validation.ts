import { Types } from "mongoose";
import { z } from "zod";

export const PaymentMethodSchema = z.object({
  user: z.instanceof(Types.ObjectId),
  paymentType: z.enum(["card", "stripe", "paypal", "cod"]),
  cardNumber: z.string().optional(),
  cardHolderName: z.string().optional(),
  expirationDate: z.string().optional(),
  cvv: z.string().optional(),
  billingAddress: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  paypalEmail: z.string().optional(),
  isDefault: z.boolean().optional(),
});
export const paymentMethodValidation = z.object({
  body: PaymentMethodSchema,
});
