import { Schema, model, Document } from "mongoose";
import { Category } from "./category.interface";

const CategorySchema = new Schema<Category & Document>({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const CategoryModel = model<Category & Document>("Category", CategorySchema);