import {Router} from "express";
import { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier, getSupplierById } from "../controllers/Supplier.controller";   

const SupplierRouter = Router();  

SupplierRouter.get("getAll/", getAllSuppliers);          
SupplierRouter.post("/create", createSupplier);       
SupplierRouter.put("/update/:id", updateSupplier);          
SupplierRouter.delete("/delete/:id", deleteSupplier);  
SupplierRouter.get("/getById/:id", getSupplierById); 

export default SupplierRouter; 