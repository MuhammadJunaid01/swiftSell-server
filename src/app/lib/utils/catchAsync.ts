import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../interfaces";

const catchAsync = (
  fn: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as CustomRequest, res, next)).catch((error) =>
      next(error)
    );
  };
};
export default catchAsync;
