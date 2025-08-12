import express from "express";
import { protect } from "../middleware/authMiddleware";
import { addSoldProduct } from "../controllers/soldProductController";

const router = express.Router();

// POST /api/sold-products
router.post("/", protect, addSoldProduct);

export default router;
