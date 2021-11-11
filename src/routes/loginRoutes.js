import { Router } from "express";

import { postLogin } from "../controllers/loginController.js";

import { postCustomers } from "../controllers/customerController.js";

const router = Router();

router.post("/login", postLogin);
router.post("/checkin", postCustomers);

export default router;