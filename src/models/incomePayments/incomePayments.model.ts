import { Schema, model, Document, Types } from "mongoose";
import { IncomePayments } from "./incomePayments.interface";


const IncomePaymentsSchema = new Schema<IncomePayments & Document>({
    InvoiceNumber: { type: Schema.Types.ObjectId, ref: "Income" },
    paymentType: { type: String },
    sum: { type: Number, required: true },
    Date: { type: Date },
    cardLastFourDigits: { type: Number },
    paymentsNum: { type: Number },
    chequeNumber: { type: Number },
    cheqeBankName: { type: String },
    transferNumber: { type: Number },
    transferBankName: { type: String }
});

export const IncomePaymentsModel = model<IncomePayments & Document>("IncomePayments", IncomePaymentsSchema);