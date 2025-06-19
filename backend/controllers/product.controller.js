import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// ✅ GET: All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ GET: Featured Products
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isFeatured: true }).populate("category", "name");

    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ POST: Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, pricePerDay, stock, image, category } = req.body;

    // validate category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
    }

    const product = await Product.create({
      name,
      description,
      pricePerDay,
      stock,
      image: cloudinaryResponse?.secure_url || "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ DELETE: Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (err) {
        console.warn("Error deleting image from Cloudinary", err.message);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET: Products by Category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  try {
    const products = await Product.find({ category }).populate("category", "name");
    res.json({ products });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ PATCH: Toggle Featured Status
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isFeatured = !product.isFeatured;
    const updated = await product.save();

    await updateFeaturedProductsCache();
    res.json(updated);
  } catch (error) {
    console.error("Error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).populate("category", "name");
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error updating Redis cache:", error.message);
  }
};

// ✅ GET: Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET: Product Categories
export const getProductCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
