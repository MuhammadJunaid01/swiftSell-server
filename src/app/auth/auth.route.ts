import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.post("/register", AuthControllers.registerUser);
router.post("/verify-otp", AuthControllers.verifyOtp);
export { router as authRouter };
