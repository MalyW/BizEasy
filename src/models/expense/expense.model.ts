import { Schema, model, Document, Types } from "mongoose";
import { Expense } from "./expense.interface";


const ExpenseSchema = new Schema<Expense & Document>({
    ReferenceNumber: { type: Number, required: true, unique: true },
    Date: { type: Date, default: Date.now },
    SupplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    CategoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    Amount: { type: Number, required: true, min: 0 },
    VAT: { type: Number, min: 0 },
    PaymentType: { type: String, enum: ["Cash", "CreditCard", "Cheque", "BankTransfer"], required: true },
    Description: { type: String, maxlength: 500 },
    FileUrl: { type: String }
});

export const ExpenseModel = model<Expense & Document>("Expense", ExpenseSchema);