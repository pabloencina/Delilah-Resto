import { Router } from "express";
import {
    getCustomers,
    postCustomers,
    getCustomerById
    //putCustomers,
    //deleteCustomers
} from "../controllers/customerController.js";
import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get("/customers", validateAdminstrator, getCustomers);
router.get("/customers/:customerId", validateRequestedCustomer, getCustomerById);
router.post("/customers", postCustomers);
//router.put("/products/:productId", putProducts);//params
//router.delete("/products/:productId", deleteProducts); // param

export default router;