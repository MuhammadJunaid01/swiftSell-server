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
exports.updatePayment = exports.getPaymentsByUserId = exports.handlePayment = void 0;
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const payment_service_1 = require("./payment.service");
exports.handlePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield (0, payment_service_1.processPayment)(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Payment processed successfully",
        data: payment,
        statusCode: statusCode_1.StatusCodes.CREATED,
    });
}));
exports.getPaymentsByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const payment = yield (0, payment_service_1.getPaymentById)(id);
    if (!payment) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: "Payment not found",
            data: null,
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            success: true,
            message: "Payment retrieved successfully",
            data: payment,
            statusCode: statusCode_1.StatusCodes.OK,
        });
    }
}));
exports.updatePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPayment = yield (0, payment_service_1.updatePaymentStatus)(req.params.id, req.body.status);
    if (!updatedPayment) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: "Payment not found",
            data: null,
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            success: true,
            message: "Payment status updated successfully",
            data: updatedPayment,
            statusCode: statusCode_1.StatusCodes.OK,
        });
    }
}));
