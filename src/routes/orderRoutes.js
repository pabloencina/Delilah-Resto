import { Router } from "express";

import {
    getOrders,
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get("/orders", validateRequestedCustomer, getOrders);
router.get("/orders/:orderId", validateRequestedCustomer);

export default router;