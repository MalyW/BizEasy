import {Router} from "express";
import { createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer } from "../controllers/Customer.controller";

const CustomerRouter = Router();

CustomerRouter.get("/", getAllCustomers);
CustomerRouter.post("/create", createCustomer);
CustomerRouter.get("/:id", getCustomerById);
CustomerRouter.put("/:id", updateCustomer);
CustomerRouter.delete("/:id", deleteCustomer);

export default CustomerRouter;