import {Router} from "express";
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "../controllers/Expense.controller";

const ExpenseRouter = Router();

ExpenseRouter.get("/getAll", getAllExpenses);
ExpenseRouter.post("/create", createExpense);
ExpenseRouter.get("/getById/:id", getExpenseById);
ExpenseRouter.put("/update/:id", updateExpense);
ExpenseRouter.delete("/delete/:id", deleteExpense);

export default ExpenseRouter;
