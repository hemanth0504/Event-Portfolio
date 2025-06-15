import express from "express";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getProductsByCategory, toggleFeaturedProduct, getProductById } from "../controllers/product.controller.js";
import {adminRoute, protectRoute} from "../middleware/auth.middleware.js"


const router = express.Router();


router.get("/",getAllProducts);
router.get("/featured",getFeaturedProducts);
router.post("/",protectRoute, adminRoute, createProduct);
router.post("/:id",protectRoute, adminRoute, deleteProduct);
router.post("/category/:category",getProductsByCategory);
router.patch("/:id/featured", protectRoute, adminRoute, toggleFeaturedProduct);
router.get("/:id", getProductById);




export default router