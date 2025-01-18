import { Response } from "express";

type SendResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};
const sendResponse = <T>(
  res: Response,
  { statusCode, message, success, data }: SendResponse<T>
) => {
  return res.status(statusCode).json({ success, message, data });
};

export default sendResponse;
