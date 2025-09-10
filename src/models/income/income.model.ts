import { Schema, model, Document, Types } from "mongoose";
import { Income } from "./income.interface";

const IncomeSchema = new Schema<Income & Document>({
    InvoiceNumber: { type: Number, required: true, unique: true },
    CustomerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    InvoiceDate: { type: Date, required: true },
    PrintDate: { type: Date, required: true },
    Amount: { type: Number, required: true },
    VAT: { type: Number },
    Description: { type: String },
    payments: [{ type: Types.ObjectId, ref: "IncomePayments" }],
    fileUrl: { type: String }
});

export const IncomeModel = model<Income & Document>("Income", IncomeSchema);