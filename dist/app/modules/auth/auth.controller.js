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
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const auth_services_1 = require("./auth.services");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield auth_services_1.AuthServices.registerUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully auth created",
        statusCode: http_status_1.default.CREATED,
        data: response,
    });
}));
const verifyOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const response = yield auth_services_1.AuthServices.verifyOtpIntoDB(email, otp);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully verified",
        statusCode: http_status_1.default.CREATED,
        data: response,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield auth_services_1.AuthServices.loginUserIntoDB(email, password);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully verified",
        statusCode: http_status_1.default.CREATED,
        data: response,
    });
}));
const logOutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const response = yield auth_services_1.AuthServices.logoutUserFromDB(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully logged out",
        statusCode: http_status_1.default.OK,
        data: response,
    });
}));
const refreshTokenAndGenerateNewAccessToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    const response = yield auth_services_1.AuthServices.refreshAccessToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully refreshed",
        statusCode: http_status_1.default.CREATED,
        data: response,
    });
}));
exports.AuthControllers = {
    registerUser,
    verifyOtp,
    loginUser,
    refreshTokenAndGenerateNewAccessToken,
    logOutUser,
};
