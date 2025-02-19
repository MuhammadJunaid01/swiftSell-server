import { Response } from "express";
import PDFDocument from "pdfkit";
import { Invoice, LineItem } from "./invoice.interface";

export const calculateTotals = (items: LineItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const generatePDFInvoice = (invoice: Invoice, res: Response) => {
  // Ensure headers are set before piping
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${invoice.id}.pdf`
  );

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res); // Pipe directly to the response stream

  const colors = {
    header: "#1f4e79",
    text: "#333333",
    lightGray: "#e6e6e6",
    total: "#1a7d1f",
  };

  // Header
  doc
    .fillColor(colors.header)
    .fontSize(20)
    .text("INVOICE", 50, 50, { align: "left" })
    .fontSize(10)
    .fillColor(colors.text)
    .text(`Invoice #: ${invoice.id}`, 50, 80)
    .text(`Date: ${invoice.date}`, 50, 95)
    .text(`Due Date: ${invoice.dueDate}`, 50, 110);

  // Company and Customer Details
  doc
    .fontSize(10)
    .fillColor(colors.header)
    .text("From:", 50, 150)
    .fillColor(colors.text)
    .text("Swift Sell", 50, 165)
    .text("123 Business Street", 50, 180)
    .text("City, State 12345", 50, 195)
    .text("swift.sell@gmail.com", 50, 210);

  doc
    .fillColor(colors.header)
    .text("Bill To:", 350, 150)
    .fillColor(colors.text)
    .text(invoice.customer.name, 350, 165)
    .text(invoice.customer.address, 350, 180)
    .text(invoice.customer.email, 350, 195)
    .text(invoice.customer.phone || "", 350, 210);

  // Table Headers
  const tableTop = 250;
  const columnWidths = [50, 150, 60, 60, 60];
  const startX = 50;
  const headers = ["#", "Description", "Quantity", "Unit Price", "Amount"];

  doc
    .fillColor(colors.header)
    .fontSize(10)
    .rect(startX, tableTop, 500, 20)
    .fillAndStroke(colors.lightGray, colors.header)
    .stroke()
    .fillColor(colors.text)
    .text(headers[0], startX + 10, tableTop + 5)
    .text(headers[1], startX + columnWidths[0], tableTop + 5)
    .text(headers[2], startX + columnWidths[0] + columnWidths[1], tableTop + 5)
    .text(
      headers[3],
      startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
      tableTop + 5
    )
    .text(
      headers[4],
      startX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3],
      tableTop + 5
    );

  // Table Rows
  let rowY = tableTop + 25;
  invoice.items.forEach((item, index) => {
    doc
      .fillColor(colors.text)
      .text((index + 1).toString(), startX + 10, rowY)
      .text(item.description, startX + columnWidths[0], rowY)
      .text(
        item.quantity.toString(),
        startX + columnWidths[0] + columnWidths[1],
        rowY
      )
      .text(
        formatCurrency(item.unitPrice),
        startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
        rowY
      )
      .text(
        formatCurrency(item.total),
        startX +
          columnWidths[0] +
          columnWidths[1] +
          columnWidths[2] +
          columnWidths[3],
        rowY
      );
    rowY += 20;
  });

  // Totals
  rowY += 10;
  doc
    .fillColor(colors.header)
    .text("Subtotal:", startX + 320, rowY)
    .fillColor(colors.text)
    .text(formatCurrency(invoice.subtotal), startX + 400, rowY);

  rowY += 20;
  doc
    .fillColor(colors.header)
    .text("Tax (10%):", startX + 320, rowY)
    .fillColor(colors.text)
    .text(formatCurrency(invoice.tax), startX + 400, rowY);

  rowY += 20;
  doc
    .fillColor(colors.total)
    .fontSize(12)
    .text("Total:", startX + 320, rowY)
    .text(formatCurrency(invoice.total), startX + 400, rowY);

  // Footer
  doc.moveTo(50, 720).lineTo(550, 720).strokeColor(colors.lightGray).stroke();

  doc
    .fontSize(10)
    .fillColor(colors.text)
    .text("Thank you for your business!", 50, 730, { align: "center" });

  // Finalize the PDF
  doc.end(); // Finalize the PDF and send it to the response
};
