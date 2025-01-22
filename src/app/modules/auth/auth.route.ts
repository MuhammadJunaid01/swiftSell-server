import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.post("/register", AuthControllers.registerUser);
router.post("/login", AuthControllers.loginUser);
router.post("/verify-otp", AuthControllers.verifyOtp);
router.post(
  "/refresh-token",
  AuthControllers.refreshTokenAndGenerateNewAccessToken
);
export { router as authRouter };
