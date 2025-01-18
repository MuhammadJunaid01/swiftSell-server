import crypto from "crypto";
import ejs from "ejs";
import fs from "fs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import config from "../../config";
const templatePath = path.resolve(__dirname, "../../builder/otpTemplate.ejs");
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

const generateHtmlContent = async (otp: string, name: string) => {
  try {
    // Define the path to your HTML template
    const templatePath = path.join(__dirname, "template.html");

    // Read the HTML template
    const template = await fs.promises.readFile(templatePath, "utf-8");

    // Replace placeholders with actual values
    const htmlContent = template
      .replace("{{name}}", "Muhammad Junaid")
      .replace("{{otp}}", otp);

    return htmlContent;
  } catch (error) {
    console.error("Error reading HTML template:", error);
    throw new Error("Failed to generate HTML content");
  }
};
export const sendOtpEmail = async (
  email: string,
  otp: string,
  name: string
) => {
  const htmlContent = await generateHtmlContent(otp, name);
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
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    // console.error("Error sending OTP:", err);
    throw new Error("Failed to send OTP");
  }
};

export const generateToken = (userId: string): string => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secretKey, options);
};
