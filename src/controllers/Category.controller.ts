import { Request, Response } from "express";
import { CategoryService } from "../services/Category_service";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await CategoryService.updateCategory(req.params.id, req.body);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await CategoryService.deleteCategory(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};