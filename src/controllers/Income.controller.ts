import { Request, Response } from "express";
import { IncomePaymentsService } from "../services/Income_payment_service";
import { IncomeService } from "../services/Income_service";


export const createIncome = async (req: Request, res: Response) => {
    try {
        const { Payments, ...rest } = req.body;

        let paymentsArr = Payments;
        if (typeof paymentsArr === "string") {
            paymentsArr = JSON.parse(paymentsArr);
        }

        const paymentsDocs = await IncomePaymentsService.createIncomePayment(paymentsArr) as { _id: string } | { _id: string }[];
        const paymentsIds = Array.isArray(paymentsDocs)
            ? paymentsDocs.map(p => p._id)
            : [paymentsDocs._id || 'noPayments'];

        const income = await IncomeService.createIncome({
            ...rest,
            payments: paymentsIds
        });
        res.status(201).json(income);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getIncomeById = async (req: Request, res: Response) => {
    try {
        const income = await IncomeService.getIncomeById(req.params.id);
        if (!income) return res.status(404).json({ error: "Income not found" });
        res.json(income);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllIncomes = async (req: Request, res: Response) => {
    try {
        const incomes = await IncomeService.getAllIncomes();
        res.json(incomes);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateIncome = async (req: Request, res: Response) => {
    try {
        const income = await IncomeService.updateIncome(req.params.id, req.body);
        if (!income) return res.status(404).json({ error: "Income not found" });
        res.json(income);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteIncome = async (req: Request, res: Response) => {
    try {
        const income = await IncomeService.deleteIncome(req.params.id);
        if (!income) return res.status(404).json({ error: "Income not found" });
        res.json({ message: "Income deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};