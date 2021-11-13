import { Router } from "express";

import {
    getOrderById,
    getOrders,
    putOrder
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get( "/orders", validateAdminstrator, getOrders );
router.get( "/orders/:orderId", validateAdminstrator, getOrderById );
router.put( "/orders/:orderId", validateAdminstrator, putOrder);

export default router;