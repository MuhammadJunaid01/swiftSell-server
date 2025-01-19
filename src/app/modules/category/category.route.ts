import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { CategoryControllers } from "./category.controller";
import { categoryValidation } from "./category.validation.schema";

const router = Router();

// Route to create a new category
router.post(
  "/",
  authGuard(Role.Admin),
  validateRequest(categoryValidation),
  CategoryControllers.createCategory
);

// Route to fetch all categories
router.get("/", CategoryControllers.getAllCategories);

// Route to fetch a category by ID
router.get("/:id", CategoryControllers.getCategoryById);

// Route to update a category
router.put("/:id", CategoryControllers.updateCategory);

// Route to delete a category
router.delete("/:id", CategoryControllers.deleteCategory);

export { router as categoryRouter };
