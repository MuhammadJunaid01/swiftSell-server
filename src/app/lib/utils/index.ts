import crypto from "crypto";
import ejs from "ejs";
import fs from "fs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import config from "../../config";
const templatePath = path.resolve(__dirname, "../../builder/otpTemplate.ejs");
export const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex"); // Generate a 6-character OTP
};

const generateHtmlContent = async (otp: string) => {
  try {
    const template = await fs.promises.readFile(templatePath, "utf-8");
    // return template.replace("{{otp}}", otp);
    return ejs.render(template, { name: "Muhammad Junaid", otp });
  } catch (error) {
    console.error("Error reading HTML template:", error);
    throw new Error("Failed to generate HTML content");
  }
};
export const sendOtpEmail = async (email: string, otp: string) => {
  const htmlContent = await generateHtmlContent(otp);
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
