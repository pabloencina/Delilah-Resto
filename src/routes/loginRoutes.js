import { Router } from "express";

import { postLogin } from "../controllers/loginController.js";

const router = Router();

router.post("/login", postLogin);

export default router;