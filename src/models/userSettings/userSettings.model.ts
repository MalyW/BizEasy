import { Schema, model, Document } from "mongoose";
import { UserSettings } from "./userSettings.interface";

const UserSettingsSchema = new Schema<UserSettings & Document>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessType: { type: String, required: true },
    companyID: { type: Number, required: true }
});

export const UserSettingsModel = model<UserSettings & Document>("UserSettings", UserSettingsSchema);