"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRequestRoutes = void 0;
// routes/returnRequest.routes.ts
const express_1 = require("express");
const returnRequest_controller_1 = require("./returnRequest.controller");
const router = (0, express_1.Router)();
router.post("/", returnRequest_controller_1.ReturnRequestController.createReturnRequest);
router.get("/:id", returnRequest_controller_1.ReturnRequestController.getReturnRequestById);
router.get("/", returnRequest_controller_1.ReturnRequestController.getAllReturnRequests);
router.put("/:id", returnRequest_controller_1.ReturnRequestController.updateReturnRequest);
router.delete("/:id", returnRequest_controller_1.ReturnRequestController.deleteReturnRequest);
exports.returnRequestRoutes = router;
