import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post("/", authGuard(Role.Admin), ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getProductById);
router.get("/view-product/:id", ProductControllers.viewProduct);
router.put("/:id", authGuard(Role.Admin), ProductControllers.updateProduct);
router.delete("/:id", authGuard(Role.Admin), ProductControllers.deleteProduct);

export { router as productRouter };
