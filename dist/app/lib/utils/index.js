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
exports.generateToken = exports.sendOtpEmail = exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config"));
const templatePath = path_1.default.resolve(__dirname, "../../builder/otpTemplate.ejs");
const generateOtp = () => {
    // Generate a 4-byte buffer and convert it to a hexadecimal string
    const otpBuffer = crypto_1.default.randomBytes(2); // 2 bytes = 16 bits = 4 hex digits
    const otpHex = otpBuffer.toString("hex");
    // Convert the hexadecimal string to a decimal number
    const otpDecimal = parseInt(otpHex, 16);
    // Ensure the OTP is 4 digits by taking the modulus with 10000
    const otp = otpDecimal % 10000;
    // Pad the OTP with leading zeros if necessary
    return otp.toString().padStart(4, "0");
};
exports.generateOtp = generateOtp;
const generateHtmlContent = (otp, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define the path to your HTML template
        const templatePath = path_1.default.join(__dirname, "otpTemplate.html");
        // Read the HTML template
        const template = yield fs_1.default.promises.readFile(templatePath, "utf-8");
        // Replace placeholders with actual values
        const htmlContent = template
            .replace("{{name}}", "Muhammad Junaid")
            .replace("{{otp}}", otp);
        return htmlContent;
    }
    catch (error) {
        console.error("Error reading HTML template:", error);
        throw new Error("Failed to generate HTML content");
    }
});
const sendOtpEmail = (email, otp, name) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlContent = yield generateHtmlContent(otp, name);
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config_1.default.NODE_ENV === "production",
        auth: {
            user: "hire.developerjunaid@gmail.com", // Your Gmail address
            pass: "htzg ivoj sahv irad", // Your Gmail password or app-specific password
        },
    });
    const mailOptions = {
        from: config_1.default.email_pass,
        to: email,
        subject: "Your OTP Code",
        // text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        html: htmlContent,
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        // console.error("Error sending OTP:", err);
        throw new Error("Failed to send OTP");
    }
});
exports.sendOtpEmail = sendOtpEmail;
const generateToken = (userId) => {
    const payload = { userId };
    const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
