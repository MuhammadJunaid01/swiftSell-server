"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const statusCode = 404;
    const message = "Invalid ID";
    const errorSources = [
        { path: error.path, message: error.message },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleCastError = handleCastError;
