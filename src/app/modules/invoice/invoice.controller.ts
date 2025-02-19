import { Request, Response } from "express";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { getInvoiceFromDB } from "./invoice.service";

export const getInvoice = catchAsync(async (req: Request, res: Response) => {
  const resp = await getInvoiceFromDB(req.body, res);
  // sendResponse(res, {
  //   statusCode: 201,
  //   success: true,
  //   data: resp,
  //   message: "created",
  // });
});
