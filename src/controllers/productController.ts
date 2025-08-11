import { Request, Response } from "express";
import Product from "../models/Product";

// Extend Express Request to include file property added by multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const addProduct = async (req: MulterRequest, res: Response) => {
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file?.path;

  try {
    if (!name || price === undefined || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name, price and quantity are required." });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      image: imageUrl,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully ✅",
      product,
    });
  } catch (err: unknown) {
    console.error("❌ Add product error:", err);
    const message =
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : String(err);
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const updateProduct = async (req: MulterRequest, res: Response) => {
  const productId = req.params.id;
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file?.path;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (quantity !== undefined) product.quantity = Number(quantity);
    if (imageUrl) product.image = imageUrl;

    await product.save();

    res.json({
      message: "Product updated successfully ✅",
      product,
    });
  } catch (err: unknown) {
    console.error("❌ Update product error:", err);
    const message =
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : String(err);
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const allProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Products fetched successfully ✅",
      total: products.length,
      products,
    });
  } catch (err: unknown) {
    console.error("❌ Fetch all products error:", err);
    const message =
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : String(err);
    res.status(500).json({ message: "Server error", error: message });
  }
};
