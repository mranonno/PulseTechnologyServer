import { Response } from "express";
import asyncHandler from "express-async-handler";
import SoldProduct from "../models/SoldProduct";
import { AuthRequest } from "../middleware/authMiddleware";

export const addSoldProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { productDetails, customerDetails, description } = req.body;

    if (!productDetails || !customerDetails) {
      res.status(400);
      throw new Error("Product details and customer details are required");
    }

    const soldProduct = await SoldProduct.create({
      productDetails,
      customerDetails,
      description,
      soldBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: soldProduct,
    });
  }
);
