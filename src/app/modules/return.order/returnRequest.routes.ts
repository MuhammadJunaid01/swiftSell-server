// routes/returnRequest.routes.ts
import { Router } from "express";
import { ReturnRequestController } from "./returnRequest.controller";

const router = Router();

router.post("/", ReturnRequestController.createReturnRequest);
router.get("/:id", ReturnRequestController.getReturnRequestById);
router.get("/", ReturnRequestController.getAllReturnRequests);
router.put("/:id", ReturnRequestController.updateReturnRequest);
router.delete("/:id", ReturnRequestController.deleteReturnRequest);

export const returnRequestRoutes = router;
