"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const user_interface_1 = require("../user/user.interface");
const deal_controller_1 = require("./deal.controller");
const router = express_1.default.Router();
exports.dealRoutes = router;
// Routes for deals
router.post("/create-deal", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), deal_controller_1.createDealController); // Create a new deal
router.get("/all-deals", deal_controller_1.getAllDealsController); // Get all deals
router.get("/:dealId", deal_controller_1.getDealByIdController); // Get deal by ID
router.put("/:dealId", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), deal_controller_1.updateDealController); // Update a deal
router.delete("/:dealId", (0, authMiddleware_1.default)(user_interface_1.Role.Admin), deal_controller_1.deleteDealController); // Delete a deal
