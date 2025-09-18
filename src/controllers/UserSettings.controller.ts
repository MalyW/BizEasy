import { Request, Response } from "express";
import { UserSettingsService } from "../services/User_settings_service";

export const createUserSettings = async (req: Request, res: Response) => {
    try {
        const user = await UserSettingsService.createUserSettings(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getUserSettingsById = async (req: Request, res: Response) => {
    try {
        const user = await UserSettingsService.getUserSettingsById(req.params.id);
        if (!user) return res.status(404).json({ error: "UserSettings not found" });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllUserSettings = async (req: Request, res: Response) => {
    try {
        const users = await UserSettingsService.getAllUserSettings();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateUserSettings = async (req: Request, res: Response) => {
    try {
        const user = await UserSettingsService.updateUserSettings(req.params.id, req.body);
        if (!user) return res.status(404).json({ error: "UserSettings not found" });
        res.json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteUserSettings = async (req: Request, res: Response) => {
    try {
        const user = await UserSettingsService.deleteUserSettings(req.params.id);
        if (!user) return res.status(404).json({ error: "UserSettings not found" });
        res.json({ message: "UserSettings deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};