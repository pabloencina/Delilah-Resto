import { Router } from "express";
import {
    getCustomers,
    postCustomers,
    getCustomerById
    //putCustomers,
    //deleteCustomers
} from "../controllers/customerController.js";

import{
    getOrdersByCustomer,
    getOrderById
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get("/customers", validateAdminstrator, getCustomers);
router.get("/customers/:customerId", validateRequestedCustomer, getCustomerById);
router.post("/customers",validateRequestedCustomer , postCustomers);
router.get("/customers/:customerId/orders", validateRequestedCustomer,getOrdersByCustomer)
router.get("/customers/:customerId/orders/:orderId", validateRequestedCustomer, getOrderById)

export default router;