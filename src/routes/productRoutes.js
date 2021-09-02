import { Router } from "express";
import {
    getProducts,
    postProducts,
    deleteProducts
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", postProducts);
router.delete("/products/:productId", deleteProducts); // param

export default router;