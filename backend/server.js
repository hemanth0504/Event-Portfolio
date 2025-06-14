import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;
app.use(express.json()); // allows to parse the body of the request

app.use("/api/auth",authRoutes);

console.log(PORT);

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:" + PORT)
    connectDB();
})
