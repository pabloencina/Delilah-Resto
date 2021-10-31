import { Router } from "express";

import {
    getAdministrators,
    postAdministrators,
    getAdministratorById
    //putCustomers,
    //deleteCustomers
} from "../controllers/administratorController.js";

import { validateAdminstrator } from "../security/validateRoles.js";

const router = Router();

router.get("/administrators", validateAdminstrator, getAdministrators);

router.get("/administrators/:administratorId", validateAdminstrator, getAdministratorById)

router.post("/administrators", validateAdminstrator, postAdministrators);

//router.put("/products/:productId", putProducts);//params

//router.delete("/products/:productId", deleteProducts); // param

export default router;