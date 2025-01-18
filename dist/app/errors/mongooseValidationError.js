"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseValidationError = void 0;
const handleMongooseValidationError = (error) => {
    const message = "validation error";
    const statusCode = 400;
    const errorSources = Object.values(error.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        message,
        statusCode,
        errorSources,
    };
};
exports.handleMongooseValidationError = handleMongooseValidationError;
