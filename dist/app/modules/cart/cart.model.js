"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    items: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            }, // Product ID
            quantity: { type: Number, required: true, min: 1 }, // Quantity of the product in the cart
            price: { type: Number, required: true }, // Price of the product at the time of adding
            total: { type: Number, required: true }, // Calculated total for this item
        },
    ],
    totalPrice: { type: Number, default: 0 }, // Total price of all items in the cart
    totalItems: { type: Number, default: 0 }, // Total number of items in the cart
}, { timestamps: true });
// Pre-save middleware to calculate total price
CartSchema.pre("save", function (next) {
    let total = 0;
    let itemCount = 0;
    this.items.forEach((item) => {
        total += item.total;
        itemCount += item.quantity;
    });
    this.totalPrice = total;
    this.totalItems = itemCount;
    next();
});
exports.Cart = (0, mongoose_1.model)("Cart", CartSchema);
