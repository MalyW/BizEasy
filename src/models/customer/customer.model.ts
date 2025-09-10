import { Schema, model, Document } from "mongoose";
import { Customer } from "./customer.interface";

const CustomerSchema = new Schema<Customer & Document>({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    companyNum: { type: Number, required: true }
});

export const CustomerModel = model<Customer & Document>("Customer", CustomerSchema);