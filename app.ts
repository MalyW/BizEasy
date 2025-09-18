import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import SupplierRouter from './src/routes/SupplierRouter.ts';
import CustomerRouter from "./src/routes/CustomerRouter.ts";
import ExpenseRouter from "./src/routes/ExpenseRouter.ts";
import IncomeRouter from "./src/routes/IncomeRouter.ts";
import IncomePaymentsRouter from "./src/routes/IncomePaymentRouter.ts";
import UserSettingsRouter from "./src/routes/UserSettings.ts";
import CategoryRouter from "./src/routes/CategoryRouter.ts";

import { connectToDb } from "./src/config/db.ts";
import mongoose from "mongoose";

connectToDb();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/categories", CategoryRouter);
app.use("/api/suppliers", SupplierRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/expenses", ExpenseRouter);
app.use("/api/incomes", IncomeRouter);
app.use("/api/incomePayments", IncomePaymentsRouter);
app.use("/api/user-settings", UserSettingsRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/minibiz")
.then(() => {console.log("Connected to MongoDB")})
.catch((error) => {console.error("MongoDB connection error:", error)});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

