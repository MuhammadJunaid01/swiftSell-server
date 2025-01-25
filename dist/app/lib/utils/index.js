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
exports.verifyPassword = exports.hashPassword = exports.generateRefreshToken = exports.generateAccessToken = exports.generateToken = exports.sendOtpEmail = exports.generateOtp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = __importDefault(require("../../modules/user/user.model"));
const templatePath = path_1.default.resolve(__dirname, "../../builder/otpTemplate.html");
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
const sendOtpEmail = (email, otp, name) => __awaiter(void 0, void 0, void 0, function* () {
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
        html: getEmailHTML(name, otp, new Date().getFullYear()),
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error("Error sending OTP:", err);
        throw new Error("Failed to send OTP");
    }
});
exports.sendOtpEmail = sendOtpEmail;
const generateToken = (userId, role) => {
    const payload = { userId, role };
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const options = { expiresIn: 3600 }; // 1 hour in seconds
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
function getEmailHTML(name, otp, year) {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Verify Your Email - SwiftSell</title>
    <style>
      /* Reset styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* Base styles */
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
        background-color: #f6f9fc;
        margin: 0;
        padding: 0;
        color: #1a1a1a;
        -webkit-font-smoothing: antialiased;
        width: 100% !important;
        min-width: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      /* Container styles for different screen sizes */
      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #f6f9fc;
        padding: 40px 20px;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        width: 100%;
      }

      /* Header styles */
      .header {
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          url("https://i.ibb.co.com/hLJzccc/app-icon.png");
        background-size: cover;
        background-position: center;
        padding: clamp(30px, 5vw, 40px);
        text-align: center;
        position: relative;
      }

      .header-overlay {
        background: linear-gradient(
          135deg,
          rgba(79, 70, 229, 0.9),
          rgba(45, 39, 180, 0.9)
        );
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }

      .logo-container {
        position: relative;
        z-index: 2;
        margin-bottom: clamp(15px, 3vw, 20px);
      }

      .logo {
        background: #ffffff;
        padding: clamp(10px, 2vw, 15px) clamp(15px, 3vw, 25px);
        border-radius: 12px;
        display: inline-block;
      }

      .logo img {
        height: clamp(30px, 5vw, 40px);
        width: auto;
        display: block;
      }

      .header-text {
        color: white;
        font-size: clamp(20px, 4vw, 24px);
        font-weight: 600;
        position: relative;
        z-index: 2;
      }

      /* Content styles */
      .content {
        padding: clamp(20px, 5vw, 40px);
      }

      h1 {
        color: #1a1a1a;
        font-size: clamp(20px, 4vw, 24px);
        font-weight: 700;
        text-align: center;
        margin-bottom: clamp(16px, 3vw, 24px);
      }

      .greeting {
        font-size: clamp(16px, 3vw, 18px);
        margin-bottom: clamp(15px, 3vw, 20px);
        color: #4a5568;
      }

      .message {
        line-height: 1.6;
        margin-bottom: clamp(24px, 4vw, 32px);
        color: #4a5568;
        font-size: clamp(14px, 2.5vw, 16px);
      }

      /* OTP Container styles */
      .otp-container {
        background: #f8fafc;
        border-radius: 12px;
        padding: clamp(16px, 3vw, 24px);
        margin: clamp(24px, 4vw, 32px) 0;
        text-align: center;
        border: 2px dashed #e2e8f0;
      }

      .otp-code {
        font-family: monospace;
        font-size: clamp(24px, 5vw, 32px);
        letter-spacing: clamp(4px, 1vw, 8px);
        color: #4f46e5;
        font-weight: 700;
        background: white;
        padding: clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px);
        border-radius: 8px;
        display: inline-block;
        margin: clamp(12px, 2vw, 16px) 0;
        border: 1px solid #e2e8f0;
        width: auto;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .expiry-text {
        color: #64748b;
        font-size: clamp(12px, 2vw, 14px);
        margin-top: clamp(12px, 2vw, 16px);
      }

      /* Warning box styles */
      .warning {
        background-color: #fff8f1;
        border-left: 4px solid #f97316;
        padding: clamp(12px, 2vw, 16px);
        margin: clamp(20px, 3vw, 24px) 0;
        border-radius: 4px;
        font-size: clamp(12px, 2vw, 14px);
        color: #9a3412;
      }

      /* Footer styles */
      .footer {
        text-align: center;
        margin-top: clamp(30px, 5vw, 40px);
        padding-top: clamp(15px, 3vw, 20px);
        border-top: 1px solid #e2e8f0;
        color: #64748b;
        font-size: clamp(12px, 2vw, 14px);
      }

      .social-links {
        margin-top: clamp(15px, 3vw, 20px);
        text-align: center;
      }

      .social-links a {
        color: #4f46e5;
        text-decoration: none;
        margin: 0 clamp(5px, 1vw, 8px);
        font-size: clamp(12px, 2vw, 14px);
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="email-container">
        <div class="header">
          <div class="header-overlay"></div>
          <div class="logo-container">
            <div class="logo">
              <img
                src="https://i.ibb.co.com/hLJzccc/app-icon.png"
                alt="SwiftSell Logo"
              />
            </div>
          </div>
          <div class="header-text">Email Verification</div>
        </div>

        <div class="content">
          <h1>Verify Your Email Address</h1>

          <p class="greeting">Hello ${name},</p>

          <p class="message">
            To complete your email verification for your SwiftSell account,
            please use the following One-Time Password (OTP). This code will
            help ensure the security of your account.
          </p>

          <div class="otp-container">
            <div class="otp-code">${otp}</div>
            <p class="expiry-text">This code will expire in 10 minutes</p>
          </div>

          <div class="warning">
            If you didn't request this code, please ignore this email. Someone
            might have entered your email address by mistake.
          </div>

          <div class="footer">
            <p>Need help? Contact SwiftSell support team</p>
            <div class="social-links">
              <a href="#">Twitter</a> <span>•</span> <a href="#">Facebook</a>
              <span>•</span>
              <a href="#">Instagram</a>
            </div>
            <p style="margin-top: 20px">
              &copy; ${year} SwiftSell. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
const generateAccessToken = (userId, role) => {
    const payload = { userId, role };
    // Generate access token with short expiration time (e.g., 1 hour)
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.secret, {
        expiresIn: "1h", // Access token expires in 1 hour
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { userId };
    // Generate refresh token with longer expiration time
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.secret_refresh, {
        expiresIn: "7d", // Refresh token expires in 7 days
    });
    // Optionally store the refresh token in the database, associated with the user
    yield user_model_1.default.findByIdAndUpdate(userId, { refreshToken });
    return refreshToken;
});
exports.generateRefreshToken = generateRefreshToken;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10; // Adjust the number of rounds for hashing complexity
    return bcryptjs_1.default.hash(password, saltRounds);
});
exports.hashPassword = hashPassword;
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(password, hashedPassword);
});
exports.verifyPassword = verifyPassword;
