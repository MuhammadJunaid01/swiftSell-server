import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import config from "../../config";

import { Role } from "../../modules/user/user.interface";
import User from "../../modules/user/user.model";
const templatePath = path.resolve(__dirname, "../../builder/otpTemplate.html");
export const generateOtp = () => {
  // Generate a 4-byte buffer and convert it to a hexadecimal string
  const otpBuffer = crypto.randomBytes(2); // 2 bytes = 16 bits = 4 hex digits
  const otpHex = otpBuffer.toString("hex");

  // Convert the hexadecimal string to a decimal number
  const otpDecimal = parseInt(otpHex, 16);

  // Ensure the OTP is 4 digits by taking the modulus with 10000
  const otp = otpDecimal % 10000;

  // Pad the OTP with leading zeros if necessary
  return otp.toString().padStart(4, "0");
};

export const sendOtpEmail = async (
  email: string,
  otp: string,
  name: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "hire.developerjunaid@gmail.com", // Your Gmail address
      pass: "htzg ivoj sahv irad", // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: config.email_pass,
    to: email,
    subject: "Your OTP Code",
    // text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    html: getEmailHTML(name, otp, new Date().getFullYear()),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending OTP:", err);
    throw new Error("Failed to send OTP");
  }
};

export const generateToken = (userId: string, role: Role): string => {
  const payload = { userId, role };
  const secretKey = process.env.JWT_SECRET_KEY || "";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secretKey, options);
};
function getEmailHTML(name: string, otp: string, year: number) {
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
export const generateAccessToken = (userId: string, role: Role): string => {
  const payload = { userId, role };

  // Generate access token with short expiration time (e.g., 1 hour)
  const accessToken = jwt.sign(payload, config.secret as string, {
    expiresIn: "1h", // Access token expires in 1 hour
  });

  return accessToken;
};
export const generateRefreshToken = async (userId: string): Promise<string> => {
  const payload = { userId };

  // Generate refresh token with longer expiration time
  const refreshToken = jwt.sign(payload, config.secret_refresh as string, {
    expiresIn: "7d", // Refresh token expires in 7 days
  });

  // Optionally store the refresh token in the database, associated with the user
  await User.findByIdAndUpdate(userId, { refreshToken });

  return refreshToken;
};
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust the number of rounds for hashing complexity
  return bcrypt.hash(password, saltRounds);
};
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
