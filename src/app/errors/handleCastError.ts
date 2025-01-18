import mongoose from "mongoose";
import { TErrorReturnType, TErrorSource } from "../interfaces";

export const handleCastError = (
  error: mongoose.Error.CastError
): TErrorReturnType => {
  const statusCode = 404;
  const message = "Invalid ID";
  const errorSources: TErrorSource[] = [
    { path: error.path, message: error.message },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};
