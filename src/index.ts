import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import soldProductRoutes from "./routes/soldProductRoutes";
import priceListRoutes from "./routes/priceListRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_: Request, res: Response) => {
  res.send("🚀 PulseTechnologyServer is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/price-list", priceListRoutes);
app.use("/api/sold-products", soldProductRoutes);

// For Vercel serverless
export default app;
