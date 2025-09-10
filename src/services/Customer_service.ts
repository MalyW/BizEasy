import { CustomerModel } from "../modules/customer/customer.model";

export class CustomerService {
    static async createCustomer(data: any) {
        const exists = await CustomerModel.findOne({ email: data.email });
        if (exists) {
            const error: any = new Error("Customer with this email already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const customer = new CustomerModel(data);
        await customer.save();
        return customer;
    }

    static async getCustomerById(id: string) {
        return CustomerModel.findById(id);
    }

    static async getAllCustomers() {
        return CustomerModel.find();
    }

    static async updateCustomer(id: string, data: any) {
        return CustomerModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCustomer(id: string) {
        return CustomerModel.findByIdAndDelete(id);
    }
}