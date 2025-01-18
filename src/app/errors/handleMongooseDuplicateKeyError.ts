/* eslint-disable */

import { TErrorReturnType, TErrorSouce } from '../interfaces';

export const handleMongooseDuplicateKeyError = (
  error: any
): TErrorReturnType => {
  const extractDuplicateKeyValue = (errorMessage: string): string | null => {
    const regex = /dup key: \{ name: "(.*)" \}/;
    const match = errorMessage.match(regex);
    return match ? match[1] : null;
  };
  const duplicateValue = extractDuplicateKeyValue(error?.message);

  const statusCode = 404;
  const message = "can't create duplicate ";
  const errorSources: TErrorSouce[] = [
    {
      path: Object.keys(error.keyPattern)[0],
      message: `Duplicate value for field ${Object.keys(error.keyValue)[0]}: ${duplicateValue}`,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};
