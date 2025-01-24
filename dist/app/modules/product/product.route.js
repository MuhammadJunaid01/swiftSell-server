"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const user_interface_1 = require("../user/user.interface");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
exports.productRouter = router;
router.post("/", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), product_controller_1.ProductControllers.createProduct);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/:id", product_controller_1.ProductControllers.getProductById);
router.get("/view-product/:id", product_controller_1.ProductControllers.viewProduct);
router.put("/:id", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), product_controller_1.ProductControllers.updateProduct);
router.delete("/:id", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), product_controller_1.ProductControllers.deleteProduct);
