import mongoose from "mongoose";
import Event from "../models/event.model.js";
import EventCategory from "../models/eventCategory.model.js";
import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("category", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};


export const getFeaturedEvents = async (req, res) => {
  try {
    let featured = await redis.get("featured_events");
    if (featured) return res.json(JSON.parse(featured));

    featured = await Event.find({ isFeatured: true }).populate("category", "name");
    if (!featured.length) return res.status(404).json({ message: "No featured events found" });

    await redis.set("featured_events", JSON.stringify(featured));
    res.json(featured);
  } catch (error) {
    console.error("Error in getFeaturedEvents:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { title, description, images, category, eventDate } = req.body;

    const categoryExists = await EventCategory.findById(category);
    if (!categoryExists) return res.status(400).json({ message: "Invalid category" });

    const uploadedImages = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        const upload = await cloudinary.uploader.upload(img.url, { folder: "events" });
        uploadedImages.push({ url: upload.secure_url, caption: img.caption || "" });
      }
    }

    const newEvent = await Event.create({
      title,
      description,
      category,
      eventDate,
      images: uploadedImages,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error in createEvent:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Remove Cloudinary images
    for (const img of event.images) {
      const publicId = img.url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`events/${publicId}`).catch(() => {});
    }

    const wasFeatured = event.isFeatured;

    await event.deleteOne();

    // Invalidate cache if it was featured
    if (wasFeatured) {
      await updateFeaturedEventsCache();
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEvent:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getEventsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  try {
    const events = await Event.find({ category: categoryId }).populate("category", "name");
    res.json({ events });
  } catch (error) {
    console.error("Error in getEventsByCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const toggleFeaturedEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.isFeatured = !event.isFeatured;
    const updated = await event.save();

    await updateFeaturedEventsCache();
    res.json(updated);
  } catch (error) {
    console.error("Error in toggleFeaturedEvent:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFeaturedEventsCache = async () => {
  try {
    const featured = await Event.find({ isFeatured: true }).populate("category", "name");
    await redis.set("featured_events", JSON.stringify(featured));
  } catch (err) {
    console.error("Error updating featured event cache:", err.message);
  }
};

// ✅ GET: Event Categories
export const getEventCategories = async (req, res) => {
  try {
    const categories = await EventCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
