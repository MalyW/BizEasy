import {Router} from "express";
import { createIncomePayment, deleteIncomePayment, getAllIncomePayments, getIncomePaymentById, updateIncomePayment } from "../controllers/IncomePayments.controller";
import { create } from "domain";

const IncomePaymentRouter = Router();

IncomePaymentRouter.get("/getIncomePaymentById/:id", getIncomePaymentById);
IncomePaymentRouter.post("/create", createIncomePayment);
IncomePaymentRouter.get("/getAllIncomePayments", getAllIncomePayments);
IncomePaymentRouter.put("/update/:id", updateIncomePayment);
IncomePaymentRouter.delete("/delete/:id", deleteIncomePayment);

export default IncomePaymentRouter;
