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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../app/config"));
const globalError_1 = require("../errors/globalError");
const catchAsync_1 = __importDefault(require("../lib/utils/catchAsync"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const authGuard = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
            throw new globalError_1.AppError(" you are not authorized ", http_status_1.default.UNAUTHORIZED);
        }
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        if (!decoded) {
            throw new globalError_1.AppError("You have no access to this route", http_status_1.default.UNAUTHORIZED);
        }
        const { userId, role } = decoded;
        if (roles && roles.length > 0 && !roles.includes(role)) {
            throw new globalError_1.AppError("You have no access to this route", http_status_1.default.UNAUTHORIZED);
        }
        const isUserExist = yield user_model_1.default.findOne({ _id: userId });
        if (!isUserExist) {
            throw new globalError_1.AppError("user not found", http_status_1.default.NOT_FOUND);
        }
        req.user = userId;
        next();
    }));
};
exports.default = authGuard;
