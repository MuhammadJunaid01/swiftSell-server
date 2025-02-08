import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "./order.interface";

// Generate a unique 8-digit order ID
const generateOrderId = async (): Promise<string> => {
  let orderId: string;
  let existingOrder;

  while (true) {
    const randomDigits = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString(); // Generate 8-digit random number
    orderId = randomDigits;

    // Check if the generated orderId already exists
    existingOrder = await Order.findOne({ orderId });
    if (!existingOrder) break;
  }

  return orderId;
};

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
    shippingAddress: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    paymentId: { type: String },
    deliveredAt: { type: Date },
    statusRecord: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: Object.values(OrderStatus),
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to generate a unique orderId before saving
OrderSchema.pre<IOrder>("save", async function (next) {
  if (!this.orderId) {
    this.orderId = await generateOrderId();
  }
  next();
});

export const Order = model<IOrder>("Order", OrderSchema);
