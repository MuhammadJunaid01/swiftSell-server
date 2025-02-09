import PDFDocument from "pdfkit";

import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Invoice, LineItem } from "./invoice.interface";
export const calculateTotals = (items: LineItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};
export const generatePDFInvoice = (invoice: Invoice, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the PDF to the response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${invoice.id}.pdf`
  );
  doc.pipe(res);

  // Helper function for text positioning
  const textLeftPosition = 50;
  const textRightPosition = 500;

  // Add company logo (using a placeholder rectangle)
  doc
    .rect(textLeftPosition, 50, 100, 50)
    .stroke()
    .fontSize(10)
    .text("Your Logo", textLeftPosition + 30, 65);

  // Company details (right aligned)
  doc
    .fontSize(10)
    .text("Your Company Name", textRightPosition, 50, { align: "right" })
    .text("123 Business Street", textRightPosition, 65, { align: "right" })
    .text("City, State 12345", textRightPosition, 80, { align: "right" })
    .text("contact@company.com", textRightPosition, 95, { align: "right" });

  // Invoice title and details
  doc
    .fontSize(24)
    .text("INVOICE", textLeftPosition, 150)
    .fontSize(10)
    .text(`Invoice Number: ${invoice.id}`, textLeftPosition, 185)
    .text(`Date: ${invoice.date}`, textLeftPosition, 200)
    .text(`Due Date: ${invoice.dueDate}`, textLeftPosition, 215);

  // Customer details
  doc
    .fontSize(12)
    .text("Bill To:", textLeftPosition, 255)
    .fontSize(10)
    .text(invoice.customer.name, textLeftPosition, 275)
    .text(invoice.customer.address, textLeftPosition, 290)
    .text(invoice.customer.email, textLeftPosition, 305)
    .text(invoice.customer.phone || "", textLeftPosition, 320);

  // Items table header
  const tableTop = 380;
  const itemCodeX = textLeftPosition;
  const descriptionX = textLeftPosition + 100;
  const quantityX = textLeftPosition + 300;
  const priceX = textLeftPosition + 400;
  const amountX = textLeftPosition + 500;

  doc
    .fontSize(10)
    .text("Item", itemCodeX, tableTop)
    .text("Description", descriptionX, tableTop)
    .text("Quantity", quantityX, tableTop)
    .text("Price", priceX, tableTop)
    .text("Amount", amountX, tableTop);

  // Add horizontal line
  doc
    .moveTo(textLeftPosition, tableTop + 20)
    .lineTo(amountX + 50, tableTop + 20)
    .stroke();

  // Items
  let position = tableTop + 40;
  invoice.items.forEach((item, index) => {
    doc
      .text(`Item ${index + 1}`, itemCodeX, position)
      .text(item.description, descriptionX, position)
      .text(item.quantity.toString(), quantityX, position)
      .text(formatCurrency(item.unitPrice), priceX, position)
      .text(formatCurrency(item.total), amountX, position);
    position += 20;
  });

  // Add horizontal line
  doc
    .moveTo(textLeftPosition, position + 10)
    .lineTo(amountX + 50, position + 10)
    .stroke();

  // Totals
  position += 30;
  doc
    .text("Subtotal:", priceX, position)
    .text(formatCurrency(invoice.subtotal), amountX, position);

  position += 20;
  doc
    .text("Tax (10%):", priceX, position)
    .text(formatCurrency(invoice.tax), amountX, position);

  position += 20;
  doc
    .fontSize(12)
    .text("Total:", priceX, position)
    .text(formatCurrency(invoice.total), amountX, position);

  // Notes
  if (invoice.notes) {
    position += 60;
    doc
      .fontSize(10)
      .text("Notes:", textLeftPosition, position)
      .text(invoice.notes, textLeftPosition, position + 20);
  }

  // Footer
  const bottomPosition = 700;
  doc
    .fontSize(10)
    .text("Thank you for your business!", textLeftPosition, bottomPosition, {
      align: "center",
    })
    .text(
      "Payment is due within 30 days",
      textLeftPosition,
      bottomPosition + 15,
      { align: "center" }
    );

  // Finalize the PDF
  doc.end();
};
