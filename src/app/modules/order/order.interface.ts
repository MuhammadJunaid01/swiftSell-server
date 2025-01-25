import { Types } from "mongoose";
export interface IOrderItem {
  product: Types.ObjectId; // The product being ordered
  quantity: number; // Quantity of the product
  price: number; // Price per product
}

export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
  Returned = "Returned",
}
type StatusRecord = {
  date: Date;
  status: OrderStatus;
};
export interface IOrder {
  orderId: string; // Unique 8-digit order ID
  user: Types.ObjectId; // User who placed the order
  items: IOrderItem[]; // List of products ordered
  totalAmount: number; // Total cost of the order
  status: OrderStatus; // Current status of the order
  shippingAddress: string; // Address where the order will be shipped
  shippingMethod: string; // Shipping method (e.g., standard, express)
  paymentMethod: string; // Payment method (e.g., credit card, PayPal)
  createdAt?: Date; // Order creation date
  updatedAt?: Date; // Order update date
  isPaid: boolean; // Whether the order is paid or not
  paymentId?: string; // Payment transaction ID if available
  deliveredAt?: Date; // When the order was delivered (if applicable)
  statusRecord: StatusRecord[];
}
