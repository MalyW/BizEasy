import { Request, Response } from "express";
import { CustomerService } from "../services/Customer_service";

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        res.json(customer);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.json(customers);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.updateCustomer(req.params.id, req.body);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.deleteCustomer(req.params.id);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "Customer deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};