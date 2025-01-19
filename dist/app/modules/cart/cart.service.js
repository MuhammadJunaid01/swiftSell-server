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
exports.getCart = exports.updateCartItem = exports.removeFromCart = exports.addToCart = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
// Add item to the cart
const addToCart = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    let cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        cart = new cart_model_1.Cart({
            user: userId,
            items: [],
            totalPrice: 0,
            totalItems: 0,
        });
    }
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (existingItemIndex > -1) {
        const existingItem = cart.items[existingItemIndex];
        existingItem.quantity += quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
    }
    else {
        const newItem = {
            product: new mongoose_1.Types.ObjectId(productId),
            quantity,
            price: product.price,
            total: product.price * quantity,
        };
        cart.items.push(newItem);
    }
    yield cart.save();
    return cart;
});
exports.addToCart = addToCart;
// Remove item from the cart
const removeFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    yield cart.save();
    return cart;
});
exports.removeFromCart = removeFromCart;
// Update item quantity in the cart
const updateCartItem = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex === -1) {
        throw new Error("Item not found in cart");
    }
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].total = cart.items[itemIndex].price * quantity;
    yield cart.save();
    return cart;
});
exports.updateCartItem = updateCartItem;
// Get the user's cart
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        throw new Error("Cart not found");
    }
    return cart;
});
exports.getCart = getCart;
