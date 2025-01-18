import mongoose from 'mongoose';
import { TErrorReturnType, TErrorSouce } from '../interfaces';

export const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError
): TErrorReturnType => {
  const message = 'validation error';
  const statusCode = 400;
  const errorSources: TErrorSouce[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  return {
    message,
    statusCode,
    errorSources,
  };
};
