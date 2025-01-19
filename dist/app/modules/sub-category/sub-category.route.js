"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const sub_category_controller_1 = require("./sub-category.controller");
const sub_category_validation_1 = require("./sub-category.validation");
const router = (0, express_1.Router)();
exports.subCategoryRouter = router;
// Route to create a subcategory
router.post("/", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), (0, validateRequest_1.validateRequest)(sub_category_validation_1.subCategoryValidation), sub_category_controller_1.SubCategoryControllers.createSubCategory);
// Route to get all subcategories
router.get("/get-all-sub-categories", sub_category_controller_1.SubCategoryControllers.getAllSubCategories);
// Route to get subcategories by category
router.get("/by-category/:categoryId", sub_category_controller_1.SubCategoryControllers.getSubCategoriesByCategory);
// Route to update a subcategory
router.put("/:id", sub_category_controller_1.SubCategoryControllers.updateSubCategory);
// Route to delete a subcategory
router.delete("/:id", sub_category_controller_1.SubCategoryControllers.deleteSubCategory);
