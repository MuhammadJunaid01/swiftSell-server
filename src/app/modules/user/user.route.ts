import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();
router.put("/update-user", UserControllers.updateUser);
export { router as userRouter };
