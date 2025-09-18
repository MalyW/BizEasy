import { CategoryModel } from "../models/category/category.model";

export class CategoryService {
    static async createCategory(data: any) {
        const exists = await CategoryModel.findOne({ name: data.name });
        if (exists) {
            const error: any = new Error("Category with this name already exists");
            error.code = "DUPLICATE";
            throw error;
        }
        const category = new CategoryModel(data);
        await category.save();
        return category;
    }

    static async getCategoryById(id: string) {
        return CategoryModel.findById(id);
    }

    static async getAllCategories() {
        return CategoryModel.find();
    }

    static async updateCategory(id: string, data: any) {
        return CategoryModel.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCategory(id: string) {
        return CategoryModel.findByIdAndDelete(id);
    }
}