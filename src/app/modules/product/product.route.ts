import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post("/", authGuard(Role.Admin), ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getProductById);
router.put("/:id", ProductControllers.updateProduct);
router.delete("/:id", ProductControllers.deleteProduct);

export { router as productRouter };
