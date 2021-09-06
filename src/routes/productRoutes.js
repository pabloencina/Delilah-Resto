import { Router } from "express";
import {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", postProducts);
router.put("/products/:productId", putProducts);//params
router.delete("/products/:productId", deleteProducts); // param

export default router;