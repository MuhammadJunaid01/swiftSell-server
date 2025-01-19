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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartHandler = exports.updateCartItemHandler = exports.removeFromCartHandler = exports.addToCartHandler = void 0;
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const cart_service_1 = require("./cart.service");
exports.addToCartHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    const cart = yield (0, cart_service_1.addToCart)(userId, productId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Item added to cart",
        data: cart,
    });
}));
exports.removeFromCartHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    const cart = yield (0, cart_service_1.removeFromCart)(userId, productId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Item removed from cart",
        data: cart,
    });
}));
exports.updateCartItemHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    const cart = yield (0, cart_service_1.updateCartItem)(userId, productId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart updated",
        data: cart,
    });
}));
exports.getCartHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const cart = yield (0, cart_service_1.getCart)(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart fetched successfully",
        data: cart,
    });
}));
