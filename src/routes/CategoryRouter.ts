import { Router } from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/Category.controller";

const CategoryRouter = Router();

CategoryRouter.get("/getAll", getAllCategories);      // שליפת כל הקטגוריות
CategoryRouter.post("/create", createCategory);       // יצירת קטגוריה חדשה
CategoryRouter.put("/update/:id", updateCategory);     // עדכון קטגוריה לפי מזהה
CategoryRouter.delete("/delete/:id", deleteCategory);  // מחיקת קטגוריה לפי מזהה

export default CategoryRouter;