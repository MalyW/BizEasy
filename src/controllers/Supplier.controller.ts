import { Request, Response } from "express";
import { SupplierService } from "../services/Supplier_service";

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierService.createSupplier(req.body);
        res.status(201).json(supplier);
    } catch (error: any) {
        if (error.code === "DUPLICATE") {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierService.getSupplierById(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });
        res.json(supplier);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await SupplierService.getAllSuppliers();
        res.json(suppliers);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });
        res.json(supplier);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Internal server error" });
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierService.deleteSupplier(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });
        res.json({ message: "Supplier deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};