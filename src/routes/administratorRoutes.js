import { Router } from "express";

import {
    getAdministrators,
    postAdministrators,
    //putCustomers,
    //deleteCustomers
} from "../controllers/administratorController.js";

const router = Router();

router.get("/administrators", getAdministrators);

router.post("/administrators", postAdministrators);

//router.put("/products/:productId", putProducts);//params

//router.delete("/products/:productId", deleteProducts); // param

export default router;