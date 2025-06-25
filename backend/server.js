import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"
import categoryRoutes from "./routes/category.routes.js";
import eventRoutes from "./routes/event.route.js";
import eventCategoryRoutes from "./routes/eventCategory.route.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';



import { connectDB } from './lib/db.js';
import redis, { connectRedis } from './lib/redis.js';
import path from "path";
import cookieParser from 'cookie-parser';
import cors from "cors";



dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json()); // allows to parse the body of the request
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/event-categories",eventCategoryRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
	});
}


const startServer = async () => {
  try {
    await connectDB();
    await connectRedis(); // ✅ correctly invoke the Redis connection// ✅ connect to Redis (Upstash)
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();