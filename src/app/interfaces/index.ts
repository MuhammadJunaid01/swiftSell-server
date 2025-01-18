export type TErrorReturnType = {
  statusCode: number;
  message: string;
  errorSources: TErrorSouce[];
};

export type TErrorSouce = {
  path: string | number;
  message: string;
};
