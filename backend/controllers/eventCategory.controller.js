import EventCategory from "../models/eventCategory.model.js";

// GET all categories
export const getAllEventCategories = async (req, res) => {
  try {
    const categories = await EventCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event categories" });
  }
};

// POST create category
export const createEventCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const existing = await EventCategory.findOne({ name: name.trim() });
    if (existing) return res.status(400).json({ error: "Category already exists" });

    const category = await EventCategory.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
