import { Router } from "express";
import {
    getCustomers
    //postCustomers,
    //putCustomers,
    //deleteCustomers
} from "../controllers/customerController.js";

const router = Router();

router.get("/customers", getCustomers);
//router.post("/custoemers", postCustomers);
//router.put("/products/:productId", putProducts);//params
//router.delete("/products/:productId", deleteProducts); // param

export default router;