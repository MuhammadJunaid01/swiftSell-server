"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteShippingInfo = exports.shippingInfoUpdate = exports.getShippingInfoByUserId = exports.createShippingInfo = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const ShippingInfoServices = __importStar(require("./shipping.info.service"));
exports.createShippingInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ShippingInfoServices.createShippingInfoIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Shipping info created successfully",
        data: response,
        success: true,
        statusCode: http_status_1.default.CREATED,
    });
}));
exports.getShippingInfoByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ShippingInfoServices.getShippingInfoFromDbByUserId(req.params.id);
    if (response.length === 0) {
        (0, sendResponse_1.default)(res, {
            message: "No shipping info found",
            data: [],
            success: true,
            statusCode: http_status_1.default.OK,
        });
        if (response.length > 0) {
            (0, sendResponse_1.default)(res, {
                message: "Shipping info found",
                data: response,
                success: true,
                statusCode: http_status_1.default.OK,
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                message: "No shipping info found",
                data: [],
                success: true,
                statusCode: http_status_1.default.OK,
            });
        }
    }
}));
exports.shippingInfoUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ShippingInfoServices.updateShippingInfoIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Shipping info updated successfully",
        data: response,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
exports.deleteShippingInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ShippingInfoServices.deleteShippingInfoFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Shipping info deleted successfully",
        data: response,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
