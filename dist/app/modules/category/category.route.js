"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const category_controller_1 = require("./category.controller");
const category_validation_schema_1 = require("./category.validation.schema");
const router = (0, express_1.Router)();
exports.categoryRouter = router;
// Route to create a new category
router.post("/", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), (0, validateRequest_1.validateRequest)(category_validation_schema_1.categoryValidation), category_controller_1.CategoryControllers.createCategory);
router.post("/create-categories", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), category_controller_1.CategoryControllers.createCategories);
// Route to fetch all categories
router.get("/", category_controller_1.CategoryControllers.getAllCategories);
// Route to fetch a category by ID
router.get("/:id", category_controller_1.CategoryControllers.getCategoryById);
// Route to update a category
router.put("/:id", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), category_controller_1.CategoryControllers.updateCategory);
// Route to delete a category
router.delete("/:id", category_controller_1.CategoryControllers.deleteCategory);
