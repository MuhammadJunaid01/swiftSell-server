import { Router } from "express";
import { CategoryControllers } from "./category.controller";

const router = Router();

// Route to create a new category
router.post("/", CategoryControllers.createCategory);

// Route to fetch all categories
router.get("/", CategoryControllers.getAllCategories);

// Route to fetch a category by ID
router.get("/:id", CategoryControllers.getCategoryById);

// Route to update a category
router.put("/:id", CategoryControllers.updateCategory);

// Route to delete a category
router.delete("/:id", CategoryControllers.deleteCategory);

export { router as categoryRouter };
