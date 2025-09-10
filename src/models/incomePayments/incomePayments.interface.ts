import { Schema } from "inspector/promises";
import { Types } from "mongoose";

export interface IncomePayments {
    InvoiceNumber: Types.ObjectId |string
    paymentType?: string;
    sum: number;
    Date?: Date;
    cardLastFourDigits?: number;
    paymentsNum?: number;
    chequeNumber?: number;
    cheqeBankName?: string;
    transferNumber?: number;
    transferBankName?: string;
}