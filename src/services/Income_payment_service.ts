import { IncomePaymentsModel } from "../models/incomePayments/incomePayments.model"


export class IncomePaymentsService {
    // IncomePaymentsService
    static async createIncomePayment(paymentsArr: any[]) {
        return IncomePaymentsModel.insertMany(paymentsArr); 
    }

    static async getIncomePaymentById(id: string) {
        return IncomePaymentsModel.findById(id);
    }

    static async getAllIncomePayments() {
        return IncomePaymentsModel.find();
    }

    static async updateIncomePayment(id: string, data: any) {
        return IncomePaymentsModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteIncomePayment(id: string) {
        return IncomePaymentsModel.findByIdAndDelete(id);
    }


}