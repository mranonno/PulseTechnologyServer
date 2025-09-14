import express from "express";
import {
  createStockHistory,
  getStockHistories,
  getStockHistoryById,
} from "../controllers/stockHistoryController";
import { validateAddStockHistory } from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/", validateAddStockHistory, createStockHistory);
router.get("/", getStockHistories);
router.get("/:id", getStockHistoryById);

export default router;
