import { Router } from "express";
import { getInvoice } from "./invoice.controller";
const router = Router();
router.post("/generate-invoice", getInvoice);
export { router as invoiceRouter };
