"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouter = void 0;
const express_1 = require("express");
const sub_category_controller_1 = require("./sub-category.controller");
const router = (0, express_1.Router)();
exports.subCategoryRouter = router;
// Route to create a subcategory
router.post("/", sub_category_controller_1.SubCategoryControllers.createSubCategory);
// Route to get all subcategories
router.get("/", sub_category_controller_1.SubCategoryControllers.getAllSubCategories);
// Route to get subcategories by category
router.post("/by-category", sub_category_controller_1.SubCategoryControllers.getSubCategoriesByCategory);
// Route to update a subcategory
router.put("/:id", sub_category_controller_1.SubCategoryControllers.updateSubCategory);
// Route to delete a subcategory
router.delete("/:id", sub_category_controller_1.SubCategoryControllers.deleteSubCategory);
