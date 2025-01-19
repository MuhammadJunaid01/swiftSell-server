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
exports.updateOrderStatus = exports.getOrdersByUserId = exports.getOrderById = exports.createOrder = void 0;
const mongoose_1 = require("mongoose");
const order_model_1 = require("./order.model");
/**
 * Create a new order.
 */
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.create(orderData);
    return order;
});
exports.createOrder = createOrder;
/**
 * Get order by ID.
 */
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findOne({ orderId }).populate("items.product user");
    return order;
});
exports.getOrderById = getOrderById;
/**
 * Get all orders for a user.
 */
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({
        user: new mongoose_1.Types.ObjectId(userId),
    }).populate("items.product");
    return orders;
});
exports.getOrdersByUserId = getOrdersByUserId;
/**
 * Update the status of an order.
 */
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrder = yield order_model_1.Order.findOneAndUpdate({ orderId }, { status }, { new: true });
    return updatedOrder;
});
exports.updateOrderStatus = updateOrderStatus;
