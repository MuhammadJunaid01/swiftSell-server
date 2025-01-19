import express from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import * as bannerSliderController from "./bannerSlider.controller";

const router = express.Router();

router.post("/", authGuard(Role.Admin), bannerSliderController.createBanner); // Only admin can create banners
router.get("/", bannerSliderController.getBanners); // Public access to view banners
router.patch(
  "/:id",
  authGuard(Role.Admin),
  bannerSliderController.updateBanner
); // Only admin can update banners
router.delete(
  "/:id",
  authGuard(Role.Admin),
  bannerSliderController.deleteBanner
); // Only admin can delete banners

export const bannerSliderRoutes = router;
