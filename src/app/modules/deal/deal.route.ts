import express from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import {
  createDealController,
  deleteDealController,
  getAllDealsController,
  getDealByIdController,
  updateDealController,
} from "./deal.controller";

const router = express.Router();

// Routes for deals
router.post("/create-deal", authGuard(Role.Admin), createDealController); // Create a new deal
router.get("/all-deals", getAllDealsController); // Get all deals
router.get("/:dealId", getDealByIdController); // Get deal by ID
router.put("/:dealId", authGuard(Role.Admin), updateDealController); // Update a deal
router.delete("/:dealId", authGuard(Role.Admin), deleteDealController); // Delete a deal

export { router as dealRoutes };
