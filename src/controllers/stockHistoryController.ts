import { Request, Response } from "express";
import StockHistory from "../models/StockHistory";

// ➕ Create a stock history entry
export const createStockHistory = async (req: Request, res: Response) => {
  try {
    const stockHistory = new StockHistory(req.body);
    await stockHistory.save();

    res.status(201).json({
      message: "Stock history added ✅",
      stockHistory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error saving stock history ❌",
      error: err,
    });
  }
};

// 📜 Get all stock histories (with filters)
export const getStockHistories = async (req: Request, res: Response) => {
  try {
    const { productId, type } = req.query;
    const filter: any = {};

    if (productId) filter.productId = productId;
    if (type) filter.type = type;

    const histories = await StockHistory.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Stock histories fetched ✅",
      total: histories.length,
      histories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stock histories ❌",
      error: err,
    });
  }
};

// 🔎 Get stock history by ID
export const getStockHistoryById = async (req: Request, res: Response) => {
  try {
    const history = await StockHistory.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ message: "Stock history not found ❌" });
    }

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stock history ❌",
      error: err,
    });
  }
};
