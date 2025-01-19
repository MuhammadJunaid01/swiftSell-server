"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const router = (0, express_1.Router)();
exports.cartRouter = router;
// Route for adding items to the cart
router.post("/add", cart_controller_1.addToCartHandler);
// Route for removing items from the cart
router.post("/remove", cart_controller_1.removeFromCartHandler);
// Route for updating item quantity
router.post("/update", cart_controller_1.updateCartItemHandler);
// Route for fetching the user's cart
router.get("/:userId", cart_controller_1.getCartHandler);
