"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
exports.categoryRouter = router;
// Route to create a new category
router.post("/", category_controller_1.CategoryControllers.createCategory);
// Route to fetch all categories
router.get("/", category_controller_1.CategoryControllers.getAllCategories);
// Route to fetch a category by ID
router.get("/:id", category_controller_1.CategoryControllers.getCategoryById);
// Route to update a category
router.put("/:id", category_controller_1.CategoryControllers.updateCategory);
// Route to delete a category
router.delete("/:id", category_controller_1.CategoryControllers.deleteCategory);
