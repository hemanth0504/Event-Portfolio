import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"
import categoryRoutes from "./routes/category.routes.js";
import eventRoutes from "./routes/event.route.js";
import eventCategoryRoutes from "./routes/eventCategory.route.js";


import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";



dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;
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

console.log(PORT);

app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:" + PORT)
    connectDB();
})
