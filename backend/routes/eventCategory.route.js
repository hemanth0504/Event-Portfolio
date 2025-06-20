import express from "express";
import {
  getAllEventCategories,
  createEventCategory,
} from "../controllers/eventCategory.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
import  {adminRoute}  from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllEventCategories);
router.post("/", protectRoute, adminRoute, createEventCategory);


export default router;
