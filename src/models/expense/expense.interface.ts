import { Types } from "mongoose";

export interface Expense {
    ReferenceNumber: number;
    Date: Date;
    SupplierId: Types.ObjectId | string;
    CategoryId: Types.ObjectId | string;
    Amount: number;
    VAT?: number;
    PaymentType: "Cash" | "CreditCard" | "Cheque" | "BankTransfer";
    Description?: string;
    FileUrl?: string;
}