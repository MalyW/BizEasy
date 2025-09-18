import { SupplierModel } from "../models/supplier/supplier.model";

export class SupplierService {
    static async createSupplier(data: any) {
        const exists = await SupplierModel.findOne({ name: data.name });
        if (exists) {
            const error: any = new Error("Supplier with this name already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const supplier = new SupplierModel(data);
        await supplier.save();
        return supplier;
    }

    static async getSupplierById(id: string) {
        return SupplierModel.findById(id);
    }

    static async getAllSuppliers() {
        return SupplierModel.find();
    }

    static async updateSupplier(id: string, data: any) {
        return SupplierModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteSupplier(id: string) {
        return SupplierModel.findByIdAndDelete(id);
    }
}