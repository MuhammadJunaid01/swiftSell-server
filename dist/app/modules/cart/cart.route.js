"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
// Route for adding items to the cart
router.post("/add", cart_controller_1.addToCartHandler);
// Route for removing items from the cart
router.post("/remove", cart_controller_1.removeFromCartHandler);
// Route for updating item quantity
router.post("/update", cart_controller_1.updateCartItemHandler);
// Route for fetching the user's cart
router.get("/:userId", cart_controller_1.getCartHandler);
exports.default = router;
