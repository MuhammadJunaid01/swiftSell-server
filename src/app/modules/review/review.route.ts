import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import * as ReviewController from "./review.controller";

const router = Router();

router.post("/", authGuard(Role.User), ReviewController.createReview); // Only logged-in users can create reviews
router.get("/:productId", ReviewController.getProductReviews);
router.delete(
  "/:reviewId",
  authGuard(Role.Admin),
  ReviewController.deleteReview
); // Only the owner can delete a review
router.patch(
  "/approve/:reviewId",
  authGuard(Role.Admin),
  ReviewController.approveReview
); // Admin can approve reviews

export { router as reviewRouter };
