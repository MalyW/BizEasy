import { Router } from "express";
import { upload } from "../middleware/multer.config";
import { loadReceiptFile, validateIncomePayment } from "../middleware/validation/Income_validation_middleware";
import { createIncome, deleteIncome, getAllIncomes, getIncomeById, updateIncome } from "../controllers/Income.controller";


const IncomeRouter = Router();

IncomeRouter.post("/upload", upload.single("file"), loadReceiptFile, validateIncomePayment, createIncome);
IncomeRouter.get("/getAllIncomes", getAllIncomes);
IncomeRouter.get("/getIncomeById/:id", getIncomeById);
IncomeRouter.put("/update/:id", updateIncome);
IncomeRouter.delete("/delete/:id", deleteIncome);

export default IncomeRouter;