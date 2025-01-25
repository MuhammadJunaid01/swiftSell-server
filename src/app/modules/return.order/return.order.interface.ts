import { Types } from "mongoose";

export interface IReturnRequest extends Document {
  orderId: Types.ObjectId; // Reference to the Order
  userId: Types.ObjectId; // Reference to the User
  items: {
    productId: Types.ObjectId; // Reference to the Product
    quantity: number; // Quantity of the product being returned
    reason: string; // Reason for return
    uploadedImages?: string[]; // Array of image URLs (evidence)
  }[];
  status: "Pending" | "Approved" | "Rejected" | "Completed"; // Status of the return
  refundAmount: number; // Refund amount (calculated)
  refundTransactionId?: string; // Optional refund transaction ID
  createdAt: Date; // Date of request creation
  processedAt?: Date; // Date when return is processed
  notes?: string; // Admin notes or comments
  reason?: string;
}
