import express from "express";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  getFeaturedEvents,
  getEventsByCategory,
  toggleFeaturedEvent,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET all events
router.get("/", getAllEvents);

// GET featured events
router.get("/featured", getFeaturedEvents);

// GET events by category
router.get("/category/:categoryId", getEventsByCategory);

// POST create event
router.post("/",protectRoute,adminRoute ,createEvent);

// DELETE event
router.delete("/:id",protectRoute,adminRoute,deleteEvent);

// PATCH toggle featured
router.patch("/:id/featured",protectRoute,adminRoute, toggleFeaturedEvent);

export default router;
