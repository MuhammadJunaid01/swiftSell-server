import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();
router.patch("/update-user", UserControllers.updateUser);
export { router as userRouter };
