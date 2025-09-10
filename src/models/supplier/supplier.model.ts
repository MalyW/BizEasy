import { Schema, model, Document } from "mongoose";
import { Supplier } from "./supplier.interface";

const SupplierSchema = new Schema<Supplier & Document>({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    companyNum: { type: Number }
});

export const SupplierModel = model<Supplier & Document>("Supplier", SupplierSchema);