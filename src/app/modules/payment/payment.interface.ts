// interfaces/PaymentMethod.ts

import { Types } from "mongoose";

export interface PaymentMethod {
  user: Types.ObjectId;
  paymentType: "card" | "stripe" | "paypal" | "cod"; // Include COD
  cardNumber?: string; // Optional for Stripe, PayPal, and COD
  cardHolderName?: string; // Optional for Stripe, PayPal, and COD
  expirationDate?: string; // Optional for Stripe, PayPal, and COD
  cvv?: string; // Optional for Stripe, PayPal, and COD
  billingAddress?: string; // Optional for Stripe, PayPal, and COD
  stripeCustomerId?: string; // For Stripe payments
  paypalEmail?: string; // For PayPal payments
  isDefault?: boolean; // Optional
}
