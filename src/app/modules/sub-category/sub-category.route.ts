import { Router } from "express";
import { SubCategoryControllers } from "./sub-category.controller";

const router = Router();

// Route to create a subcategory
router.post("/", SubCategoryControllers.createSubCategory);

// Route to get all subcategories
router.get("/", SubCategoryControllers.getAllSubCategories);

// Route to get subcategories by category
router.post("/by-category", SubCategoryControllers.getSubCategoriesByCategory);

// Route to update a subcategory
router.put("/:id", SubCategoryControllers.updateSubCategory);

// Route to delete a subcategory
router.delete("/:id", SubCategoryControllers.deleteSubCategory);

export { router as subCategoryRouter };
