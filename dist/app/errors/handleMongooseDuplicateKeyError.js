"use strict";
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseDuplicateKeyError = void 0;
const handleMongooseDuplicateKeyError = (error) => {
    const extractDuplicateKeyValue = (errorMessage) => {
        const regex = /dup key: \{ name: "(.*)" \}/;
        const match = errorMessage.match(regex);
        return match ? match[1] : null;
    };
    const duplicateValue = extractDuplicateKeyValue(error === null || error === void 0 ? void 0 : error.message);
    const statusCode = 404;
    const message = "can't create duplicate ";
    const errorSources = [
        {
            path: Object.keys(error.keyPattern)[0],
            message: `Duplicate value for field ${Object.keys(error.keyValue)[0]}: ${duplicateValue}`,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleMongooseDuplicateKeyError = handleMongooseDuplicateKeyError;
