"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Create a new order
router.post("/create", (0, authMiddleware_1.default)("user"), order_controller_1.createOrderHandler);
// Get order by ID
router.get("/:orderId", (0, authMiddleware_1.default)("user"), order_controller_1.getOrderHandler);
// Get all orders for the authenticated user
router.get("/", (0, authMiddleware_1.default)("user"), order_controller_1.getOrdersForUserHandler);
// Update order status
router.patch("/:orderId/status", (0, authMiddleware_1.default)("admin"), order_controller_1.updateOrderStatusHandler);
exports.default = router;
