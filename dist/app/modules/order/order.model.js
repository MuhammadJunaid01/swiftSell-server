"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_interface_1 = require("./order.interface");
// Generate a unique 8-digit order ID
const generateOrderId = () => __awaiter(void 0, void 0, void 0, function* () {
    let orderId;
    let existingOrder;
    // Keep generating new orderId until it is unique
    while (true) {
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of the timestamp
        const randomDigits = Math.floor(100 + Math.random() * 900); // Random 3-digit number
        orderId = `${timestamp}${randomDigits}`; // Combine timestamp and random digits to form the order ID
        // Check if the generated orderId already exists in the database
        existingOrder = yield exports.Order.findOne({ orderId });
        // If the orderId does not exist, break the loop and return it
        if (!existingOrder) {
            break;
        }
    }
    return orderId;
});
const OrderSchema = new mongoose_1.Schema({
    orderId: { type: String, unique: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(order_interface_1.OrderStatus),
        default: order_interface_1.OrderStatus.Pending,
    },
    shippingAddress: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    paymentId: { type: String },
    deliveredAt: { type: Date },
}, { timestamps: true });
// Pre-save hook to generate orderId automatically before saving the order
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.orderId) {
            this.orderId = yield generateOrderId(); // Set the generated orderId if it's not already set
        }
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
