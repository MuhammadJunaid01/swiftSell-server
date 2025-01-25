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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../app/config"));
const globalError_1 = require("../errors/globalError");
const statusCode_1 = require("../lib/statusCode");
const catchAsync_1 = __importDefault(require("../lib/utils/catchAsync"));
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const authGuard = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authorizationHeader = req.headers.authorization;
        // Check if authorization header is provided and starts with "Bearer"
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
            throw new globalError_1.AppError("Authorization header is missing or improperly formatted. Please provide a valid token.", statusCode_1.StatusCodes.UNAUTHORIZED);
        }
        const token = authorizationHeader.split(" ")[1];
        // Verify token
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        }
        catch (error) {
            throw new globalError_1.AppError("Invalid or expired token. Please login again to obtain a valid token.", statusCode_1.StatusCodes.UNAUTHORIZED);
        }
        const { userId, role } = decoded;
        console.log("role", role);
        // Allow admin to access all routes
        if (role === user_interface_1.Role.Admin) {
            req.user = userId;
            return next();
        }
        // Check if the user's role is allowed to access the route
        if (roles.length > 0 && !roles.includes(role)) {
            throw new globalError_1.AppError(`Access denied. This route is restricted to roles: ${roles.join(", ")}.`, statusCode_1.StatusCodes.FORBIDDEN);
        }
        // Check if the user exists in the database
        const isUserExist = yield user_model_1.default.findOne({ _id: userId });
        if (!isUserExist) {
            throw new globalError_1.AppError("The user associated with this token does not exist. Please ensure your account is active.", statusCode_1.StatusCodes.NOT_FOUND);
        }
        req.user = userId;
        next();
    }));
};
exports.default = authGuard;
