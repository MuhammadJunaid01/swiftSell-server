import { Types } from "mongoose";

export interface IPayment extends Document {
  user: Types.ObjectId; // Reference to User
  order: Types.ObjectId; // Reference to Order
  method: "Stripe" | "PayPal" | "CashOnDelivery"; // Payment method
  amount: number; // Payment amount
  transactionId?: string; // Optional transaction ID for online payments
  status: "Pending" | "Completed" | "Failed" | "Refunded"; // Payment status
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
}
