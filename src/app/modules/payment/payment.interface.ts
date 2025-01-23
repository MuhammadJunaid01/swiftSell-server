// interfaces/PaymentMethod.ts

import { Types } from "mongoose";

export interface PaymentMethod {
  user: Types.ObjectId;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
  isDefault?: boolean; // Optional
}
