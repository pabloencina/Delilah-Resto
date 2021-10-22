import { Router } from "express";
import {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts
} from "../controllers/productController.js";
import { validateAdminstrator } from "../security/validateRoles.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", validateAdminstrator, postProducts);
router.put("/products/:productId", validateAdminstrator, putProducts);//params
router.delete("/products/:productId", validateAdminstrator, deleteProducts); // param

export default router;