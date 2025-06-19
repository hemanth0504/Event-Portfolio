import express from "express";
import {
  getAllEventCategories,
  createEventCategory,
} from "../controllers/eventCategory.controller.js";

const router = express.Router();

router.get("/", getAllEventCategories);
router.post("/", createEventCategory);

export default router;
