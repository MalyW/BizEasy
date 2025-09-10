import { Request, Response, NextFunction } from "express";
import fs from "fs";
import pdfParse from "pdf-parse"; 

export async function loadReceiptFile(req: Request, res: Response, next: NextFunction) {
  const file = req.file as (Express.Multer.File & { parsedData?: any });

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const isJson = file.mimetype === "application/json" || file.originalname.endsWith(".json");
  const isPdf = file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf");

  if (isJson) {
    const Data = fs.readFileSync(file.path);
    let parsedJData: any = {};
    try {
      parsedJData = JSON.parse(Data.toString());
    } catch (e) {
      console.log("File is not valid JSON, skipping parse.");
    }
    req.body.InvoiceNumber = req.body.InvoiceNumber ?? parsedJData.InvoiceNumber;
    req.body.CustomerId = req.body.CustomerId ?? parsedJData.CustomerId;
    req.body.InvoiceDate = req.body.InvoiceDate ?? parsedJData.InvoiceDate;
    req.body.PrintDate = req.body.PrintDate ?? parsedJData.PrintDate;
    req.body.Amount = req.body.Amount ?? parsedJData.Amount;
    req.body.VAT = req.body.VAT ?? parsedJData.VAT;
    req.body.Description = req.body.Description ?? parsedJData.Description;
    req.body.payments = req.body.payments ?? parsedJData.payments;
  }

  if (isPdf) {
    const buffer = fs.readFileSync(file.path);
    try {
        const data = await pdfParse(buffer);

        const invoiceMatch = data.text.match(/InvoiceNumber:\s*(\d+)/);
        if (invoiceMatch) req.body.InvoiceNumber = req.body.InvoiceNumber ?? Number(invoiceMatch[1]);

        const customerMatch = data.text.match(/CustomerId:\s*([a-zA-Z0-9]+)/);
        if (customerMatch) req.body.CustomerId = req.body.CustomerId ?? customerMatch[1];

        const invoiceDateMatch = data.text.match(/InvoiceDate:\s*([0-9\/\-]+)/);
        if (invoiceDateMatch) req.body.InvoiceDate = req.body.InvoiceDate ?? invoiceDateMatch[1];

        const printDateMatch = data.text.match(/PrintDate:\s*([0-9\/\-]+)/);
        if (printDateMatch) req.body.PrintDate = req.body.PrintDate ?? printDateMatch[1];

        const amountMatch = data.text.match(/Amount:\s*(\d+(\.\d+)?)/);
        if (amountMatch) req.body.Amount = req.body.Amount ?? Number(amountMatch[1]);

        const vatMatch = data.text.match(/VAT:\s*(\d+(\.\d+)?)/);
        if (vatMatch) req.body.VAT = req.body.VAT ?? Number(vatMatch[1]);

        const descriptionMatch = data.text.match(/Description:\s*(.+)/);
        if (descriptionMatch) req.body.Description = req.body.Description ?? descriptionMatch[1].trim();

        const paymentsMatch = data.text.match(/payments:\s*\[([^\]]*)\]/);
        if (paymentsMatch) {
            req.body.payments = req.body.payments ?? paymentsMatch[1].split(",").map(s => s.trim());
        }

        const fileUrlMatch = data.text.match(/fileUrl:\s*(.+)/);
        if (fileUrlMatch) req.body.fileUrl = req.body.fileUrl ?? fileUrlMatch[1].trim();
    } catch (e) {
        console.log("Failed to parse PDF:", e);
    }
  }

  req.body.fileUrl = req.file?.path;
  next();
}


export function validateIncomePayment(req: Request, res: Response, next: NextFunction) {
  const errors: string[] = [];
  const {
    InvoiceNumber,
    CustomerId,
    InvoiceDate,
    PrintDate,
    Amount,
    VAT,
    Description,
    payments,
    fileUrl
  } = req.body;

  const invoiceNumber = Number(InvoiceNumber);
  const amount = Number(Amount);

  if (!invoiceNumber || invoiceNumber <= 0) {
    errors.push("InvoiceNumber is required and must be a positive number");
  }
  if (!CustomerId || typeof CustomerId !== "string" || CustomerId.length === 0) {
    errors.push("CustomerId is required and must be a non-empty string");
  }
  if (!InvoiceDate || isNaN(new Date(InvoiceDate).getTime())) {
    errors.push("InvoiceDate is required and must be a valid date");
  }
  if (!PrintDate || isNaN(new Date(PrintDate).getTime())) {
    errors.push("PrintDate is required and must be a valid date");
  }
  if (typeof amount !== "number" || amount <= 0) {
    errors.push("Amount is required and must be a positive number");
  }
  if (VAT !== undefined && (typeof VAT !== "number" || VAT < 0)) {
    errors.push("VAT must be a non-negative number");
  }
  if (Description !== undefined && typeof Description !== "string") {
    errors.push("Description must be a string");
  }
  if (payments !== undefined && !Array.isArray(payments)) {
    errors.push("payments must be an array");
  }
  if (!fileUrl || (fileUrl !== undefined && typeof fileUrl !== "string")) {
    errors.push("fileUrl must be a string or required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
