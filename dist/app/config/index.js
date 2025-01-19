"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const databaseUrl = process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL;
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: databaseUrl,
    secret: process.env.SECRET_TOKEN,
    secret_refresh: process.env.SECRET_REFRESH,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    accessTokenExpiration: process.env.accessTokenExpiration,
    refreshTokenExpiration: process.env.refreshTokenExpiration,
};
