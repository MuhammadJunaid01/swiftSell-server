import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { SubCategoryControllers } from "./sub-category.controller";
import { subCategoryValidation } from "./sub-category.validation";

const router = Router();

// Route to create a subcategory
router.post(
  "/sub-category",
  authGuard(Role.Admin),
  validateRequest(subCategoryValidation),
  SubCategoryControllers.createSubCategory
);

// Route to get all subcategories
router.get("/sub-categories", SubCategoryControllers.getAllSubCategories);

// Route to get subcategories by category
router.get(
  "/sub-category/:categoryId",
  SubCategoryControllers.getSubCategoriesByCategory
);

// Route to update a subcategory
router.put(
  "/:id",
  authGuard(Role.Admin),
  SubCategoryControllers.updateSubCategory
);

// Route to delete a subcategory
router.delete("/:id", SubCategoryControllers.deleteSubCategory);

export { router as subCategoryRouter };
