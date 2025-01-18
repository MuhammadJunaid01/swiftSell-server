import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "../../config";

export const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex"); // Generate a 6-character OTP
};

export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: config.email_pass,
      pass: config.email_pass,
    },
  });

  const mailOptions = {
    from: config.email_pass,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
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
