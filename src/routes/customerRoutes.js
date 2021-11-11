import { Router } from "express";
import {
    getCustomers,
    postCustomers,
    getCustomerById
} from "../controllers/customerController.js";

import{
    getOrdersByCustomer,
    getOrderById,
    postOrderByCustomerId,
    putOrderByCustomerId
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get("/customers", validateAdminstrator, getCustomers);
router.get("/customers/:customerId", validateRequestedCustomer, getCustomerById);
router.get("/customers/:customerId/orders", validateRequestedCustomer,getOrdersByCustomer)
router.get("/customers/:customerId/orders/:orderId", validateRequestedCustomer, getOrderById)
router.post("/customers/:customerId/orders", validateRequestedCustomer, postOrderByCustomerId)
router.put("/customers/:customerId/orders/:orderId", validateRequestedCustomer, putOrderByCustomerId)

export default router;