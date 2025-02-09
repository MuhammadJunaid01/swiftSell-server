import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Invoice, LineItem } from "./invoice.interface";
import { calculateTotals, generatePDFInvoice } from "./invoice.utils";

export const getInvoiceFromDB = async (data: any, res: Response) => {
  const { customer, items, notes } = data;
  const itemsWithTotals = items.map((item: LineItem) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));

  // Calculate invoice totals
  const { subtotal, tax, total } = calculateTotals(itemsWithTotals);

  // Create invoice object
  const invoice: Invoice = {
    id: uuidv4().substring(0, 8).toUpperCase(),
    date: new Date().toLocaleDateString(),
    dueDate: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(), // Due in 30 days
    customer,
    items: itemsWithTotals,
    subtotal,
    tax,
    total,
    notes,
  };

  // Generate PDF
  generatePDFInvoice(invoice, res);
};
