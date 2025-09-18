import { Router } from "express";
import { createUserSettings, deleteUserSettings, getAllUserSettings, getUserSettingsById, updateUserSettings } from "../controllers/UserSettings.controller";

const UserSettingsRouter = Router();

UserSettingsRouter.get("/", getAllUserSettings);
UserSettingsRouter.post("/create", createUserSettings);
UserSettingsRouter.get("/getById/:id", getUserSettingsById);
UserSettingsRouter.put("/update/:id", updateUserSettings);
UserSettingsRouter.delete("/delete/:id", deleteUserSettings);

export default UserSettingsRouter;