import { ExpenseModel } from "../models/expense/expense.model";

export class ExpenseService {
    static async createExpense(data: any) {
        const exists = await ExpenseModel.findOne({ ReferenceNumber: data.ReferenceNumber });
        if (exists) {
            const error: any = new Error("Expense with this ReferenceNumber already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const expense = new ExpenseModel(data);
        await expense.save();
        return expense;
    }

    static async getExpenseById(id: string) {
        return ExpenseModel.findById(id);
    }

    static async getAllExpenses() {
        return ExpenseModel.find();
    }

    static async updateExpense(id: string, data: any) {
        return ExpenseModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteExpense(id: string) {
        return ExpenseModel.findByIdAndDelete(id);
    }
}