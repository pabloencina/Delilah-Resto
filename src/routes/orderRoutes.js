import { Router } from "express";

import {
    getOrders,
    putOrderById
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get( "/orders", validateAdminstrator, getOrders );
router.get( "/orders/:orderId", validateRequestedCustomer );
router.post( "/orders", validateRequestedCustomer );
router.put( "/orders/:orderId", validateAdminstrator, putOrderById )

export default router;