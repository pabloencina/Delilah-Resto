import { Router } from "express";

import {
    getOrderById,
    getOrders,
    putOrder,
    deleteOrder
} from "../controllers/orderController.js";

import { validateAdminstrator } from "../security/validateRoles.js";

const router = Router();

router.get( "/orders", validateAdminstrator, getOrders );
router.get( "/orders/:orderId", validateAdminstrator, getOrderById );
router.put( "/orders/:orderId", validateAdminstrator, putOrder);
router.delete( "/orders/:orderId", validateAdminstrator, deleteOrder);

export default router;