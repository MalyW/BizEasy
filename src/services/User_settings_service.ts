import { UserSettingsModel } from "../models/userSettings/userSettings.model";

export class UserSettingsService {
    static async createUserSettings(data: any) {
        const exists = await UserSettingsModel.findOne({ email: data.email });
        if (exists) {
            const error: any = new Error("User with this email already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const user = new UserSettingsModel(data);
        await user.save();
        return user;
    }

    static async getUserSettingsById(id: string) {
        return UserSettingsModel.findById(id);
    }

    static async getAllUserSettings() {
        return UserSettingsModel.find();
    }

    static async updateUserSettings(id: string, data: any) {
        return UserSettingsModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteUserSettings(id: string) {
        return UserSettingsModel.findByIdAndDelete(id);
    }
}