import { Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Invoice, LineItem } from "./invoice.interface";
import { calculateTotals, generatePDFInvoice } from "./invoice.utils";

export const getInvoiceFromDB = async (data: any, res: Response) => {
  const { customer, items, notes } = data;
  const invoice: Invoice = {
    id: "4",
    date: new Date().toLocaleDateString(),
    dueDate: new Date().toLocaleDateString(),
    customer: customer,
    items: items,
    subtotal: 0,
    tax: 0,
    total: 0,
  };
  generatePDFInvoice(invoice, res);
};
