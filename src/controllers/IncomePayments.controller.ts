import { Request, Response } from "express";
import { IncomePaymentsService } from "../services/Income_payment_service";

export const createIncomePayment = async (req: Request, res: Response) => {
    try {
        const payment = await IncomePaymentsService.createIncomePayment(req.body);
        res.status(201).json(payment);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getIncomePaymentById = async (req: Request, res: Response) => {
    try {
        const payment = await IncomePaymentsService.getIncomePaymentById(req.params.id);
        if (!payment) return res.status(404).json({ error: "IncomePayment not found" });
        res.json(payment);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllIncomePayments = async (req: Request, res: Response) => {
    try {
        const payments = await IncomePaymentsService.getAllIncomePayments();
        res.json(payments);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateIncomePayment = async (req: Request, res: Response) => {
    try {
        const payment = await IncomePaymentsService.updateIncomePayment(req.params.id, req.body);
        if (!payment) return res.status(404).json({ error: "IncomePayment not found" });
        res.json(payment);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteIncomePayment = async (req: Request, res: Response) => {
    try {
        const payment = await IncomePaymentsService.deleteIncomePayment(req.params.id);
        if (!payment) return res.status(404).json({ error: "IncomePayment not found" });
        res.json({ message: "IncomePayment deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};