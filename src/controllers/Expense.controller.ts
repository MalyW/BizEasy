import { Request, Response } from "express";
import { ExpenseService } from "../services/Expense_service";

export const createExpense = async (req: Request, res: Response) => {
    try {
        const expense = await ExpenseService.createExpense(req.body);
        res.status(201).json(expense);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    try {
        const expense = await ExpenseService.getExpenseById(req.params.id);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json(expense);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await ExpenseService.getAllExpenses();
        res.json(expenses);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const expense = await ExpenseService.updateExpense(req.params.id, req.body);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json(expense);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const expense = await ExpenseService.deleteExpense(req.params.id);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json({ message: "Expense deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};