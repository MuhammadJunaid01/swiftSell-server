import { Types } from "mongoose";

export interface IPayment {
  user: Types.ObjectId; // Reference to User
  order: Types.ObjectId; // Reference to Order
  method: "Stripe" | "PayPal" | "CashOnDelivery"; // Payment method
  amount: number; // Payment amount
  status: "Pending" | "Completed" | "Failed" | "Refunded"; // Payment status
  createdAt: Date;
  updatedAt: Date;
}
