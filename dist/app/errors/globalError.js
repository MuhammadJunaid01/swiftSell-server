"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleCastError_1 = require("./handleCastError");
const handleMongooseDuplicateKeyError_1 = require("./handleMongooseDuplicateKeyError");
const mongooseValidationError_1 = require("./mongooseValidationError");
const zodError_1 = require("./zodError");
class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.code = code;
    }
}
exports.AppError = AppError;
const errorHandler = (error, req, res, next) => {
    let errorSources = [
        { path: "", message: "Something went wrong" },
    ];
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
    const stack = config_1.default.NODE_ENV === "development" ? error.stack : null;
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof mongoose_1.default.Error.ValidationError) {
        const simplifiedError = (0, mongooseValidationError_1.handleMongooseValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof mongoose_1.default.Error.CastError) {
        const simplifiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error.code === 11000 || error.code === "E11000") {
        const simplifiedError = (0, handleMongooseDuplicateKeyError_1.handleMongooseDuplicateKeyError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [{ path: "", message: error.message }];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack,
    });
};
exports.errorHandler = errorHandler;
