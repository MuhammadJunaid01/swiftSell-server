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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRequestController = void 0;
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const returnRequest_service_1 = require("./returnRequest.service");
const createReturnRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const returnRequest = yield returnRequest_service_1.ReturnRequestService.createReturnRequest(data);
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.CREATED,
        message: "Return request created successfully.",
        data: returnRequest,
        success: true,
    });
}));
const getReturnRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const returnRequest = yield returnRequest_service_1.ReturnRequestService.getReturnRequestById(id);
    if (!returnRequest) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            message: "Return request not found.",
            success: false,
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.OK,
            message: "Return request fetched successfully.",
            data: returnRequest,
            success: true,
        });
    }
}));
const getAllReturnRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.query, { page = 1, limit = 10 } = _a, filters = __rest(_a, ["page", "limit"]);
    const result = yield returnRequest_service_1.ReturnRequestService.getAllReturnRequests(filters, Number(limit), Number(page));
    (0, sendResponse_1.default)(res, {
        statusCode: statusCode_1.StatusCodes.OK,
        message: "Return requests fetched successfully.",
        data: result,
        success: true,
    });
}));
const updateReturnRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRequest = yield returnRequest_service_1.ReturnRequestService.updateReturnRequest(id, updateData);
    if (!updatedRequest) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            message: "Return request not found.",
            success: false,
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.OK,
            message: "Return request updated successfully.",
            data: updatedRequest,
            success: true,
        });
    }
}));
const deleteReturnRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedRequest = yield returnRequest_service_1.ReturnRequestService.deleteReturnRequest(id);
    if (!deletedRequest) {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.NOT_FOUND,
            message: "Return request not found.",
            success: false,
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: statusCode_1.StatusCodes.OK,
            message: "Return request deleted successfully.",
            success: true,
            data: deletedRequest,
        });
    }
}));
exports.ReturnRequestController = {
    createReturnRequest,
    getReturnRequestById,
    getAllReturnRequests,
    updateReturnRequest,
    deleteReturnRequest,
};
