import { Router } from "express";
import {
    getProducts
} from "../controllers/productController.js"

import {
    postProducts
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", postProducts);

export default router;