"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
// routes/payment.route.ts
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const user_interface_1 = require("../user/user.interface");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
exports.paymentRouter = router;
// Route to handle payment processing
router.post("/", payment_controller_1.handlePayment);
// Route to get a specific payment by ID
router.get("/:id", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), payment_controller_1.getPaymentsByUserId);
// Route to update payment status
router.patch("/:id", payment_controller_1.updatePayment);
