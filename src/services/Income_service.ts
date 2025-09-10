import { error } from "console";
import { IncomeDto } from "../modules/income";
import { IncomeModel } from "../modules/income/income.model";

export class IncomeService {
    
    static async createIncome(data: IncomeDto) {

        const exists = await IncomeModel.findOne({ InvoiceNumber: data.InvoiceNumber });
        if (exists) {
            const error: any = new Error("Income with this InvoiceNumber already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const income = new IncomeModel(data);
        await income.save();
        console.log("Created income:", income);
        return income;
    }

    static async getIncomeById(id: string) {
        return IncomeModel.findById(id);
    }

    static async getAllIncomes() {
        return IncomeModel.find();
    }

    static async updateIncome(id: string, data: any) {
        return IncomeModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteIncome(id: string) {
        const income = await IncomeModel.findById(id);
        if (!income) 
            throw new Error("Income Not Found");
        await income.deleteOne();
        return income;
    }
}

