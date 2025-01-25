"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealController = exports.updateDealController = exports.getDealByIdController = exports.getAllDealsController = exports.createDealController = void 0;
const mongoose_1 = require("mongoose");
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const deal_service_1 = require("./deal.service");
// Create a new deal
exports.createDealController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dealData = req.body;
    const newDeal = yield (0, deal_service_1.createDeal)(dealData);
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.CREATED,
        success: true,
        message: "Deal created successfully",
        data: newDeal,
    });
}));
// Get all deals
exports.getAllDealsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deals = yield (0, deal_service_1.getAllDeals)();
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.OK,
        success: true,
        message: "Deals fetched successfully",
        data: deals,
    });
}));
// Get deal by ID
exports.getDealByIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dealId } = req.params;
    const deal = yield (0, deal_service_1.getDealById)(new mongoose_1.Types.ObjectId(dealId));
    if (!deal) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Deal not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.OK,
        success: true,
        message: "Deal fetched successfully",
        data: deal,
    });
}));
// Update a deal
exports.updateDealController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dealId } = req.params;
    const dealData = req.body;
    const updatedDeal = yield (0, deal_service_1.updateDeal)(new mongoose_1.Types.ObjectId(dealId), dealData);
    if (!updatedDeal) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Deal not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.OK,
        success: true,
        message: "Deal updated successfully",
        data: updatedDeal,
    });
}));
// Delete a deal
exports.deleteDealController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dealId } = req.params;
    const deletedDeal = yield (0, deal_service_1.deleteDeal)(new mongoose_1.Types.ObjectId(dealId));
    if (!deletedDeal) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Deal not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.NO_CONTENT,
        success: true,
        message: "Deal deleted successfully",
        data: deletedDeal,
    });
}));
