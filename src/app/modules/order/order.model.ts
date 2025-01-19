import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "./order.interface";

// Generate a unique 8-digit order ID
const generateOrderId = async (): Promise<string> => {
  let orderId: string;
  let existingOrder;

  // Keep generating new orderId until it is unique
  while (true) {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of the timestamp
    const randomDigits = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    orderId = `${timestamp}${randomDigits}`; // Combine timestamp and random digits to form the order ID

    // Check if the generated orderId already exists in the database
    existingOrder = await Order.findOne({ orderId });

    // If the orderId does not exist, break the loop and return it
    if (!existingOrder) {
      break;
    }
  }

  return orderId;
};

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true },
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
  },
  { timestamps: true }
);

// Pre-save hook to generate orderId automatically before saving the order
OrderSchema.pre<IOrder>("save", async function (next) {
  if (!this.orderId) {
    this.orderId = await generateOrderId(); // Set the generated orderId if it's not already set
  }
  next();
});

export const Order = model<IOrder>("Order", OrderSchema);
