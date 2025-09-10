import { Types } from "mongoose";

export interface Income {
    InvoiceNumber: number;
    CustomerId: Types.ObjectId; // במקום string
    InvoiceDate: Date;
    PrintDate: Date;
    Amount: number;
    VAT?: number;
    Description?: string;
    payments?: Types.ObjectId[];
    fileUrl?: string;
}