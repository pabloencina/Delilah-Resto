import { Router } from "express";

import {
    getOrders
} from "../controllers/orderController.js";

import { validateAdminstrator, validateRequestedCustomer } from "../security/validateRoles.js";

const router = Router();

router.get("/orders", getOrders);
router.get("/orders/:orderId", validateRequestedCustomer);
//router.post("/orders", postOrders);
//router.put("/products/:productId", putProducts);//params
//router.delete("/products/:productId", deleteProducts); // param

export default router;