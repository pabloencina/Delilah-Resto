import { Router } from "express";

import {
    getAdministrators,
    postAdministrators,
    //putCustomers,
    //deleteCustomers
} from "../controllers/administratorController.js";

import { validateAdminstrator } from "../security/validateRoles.js";

const router = Router();

router.get("/administrators", validateAdminstrator, getAdministrators);

router.post("/administrators", validateAdminstrator, postAdministrators);

//router.put("/products/:productId", putProducts);//params

//router.delete("/products/:productId", deleteProducts); // param

export default router;