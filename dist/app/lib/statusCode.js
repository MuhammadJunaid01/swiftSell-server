"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCode = exports.getReasonPhrase = exports.StatusCodes = exports.ReasonPhrases = void 0;
const http_status_codes_1 = require("http-status-codes");
Object.defineProperty(exports, "ReasonPhrases", { enumerable: true, get: function () { return http_status_codes_1.ReasonPhrases; } });
Object.defineProperty(exports, "StatusCodes", { enumerable: true, get: function () { return http_status_codes_1.StatusCodes; } });
Object.defineProperty(exports, "getReasonPhrase", { enumerable: true, get: function () { return http_status_codes_1.getReasonPhrase; } });
Object.defineProperty(exports, "getStatusCode", { enumerable: true, get: function () { return http_status_codes_1.getStatusCode; } });
