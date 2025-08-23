import { Request, Response } from "express";
import Product from "../models/Product";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const addProduct = async (req: MulterRequest, res: Response) => {
  console.log(req.body);
  const { name, description, price, quantity, productModel, productOrigin } =
    req.body;
  const imageUrl = req.file?.path;

  try {
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        message: "Name, product model, price, and quantity are required.",
      });
    }

    const product = new Product({
      name,
      productModel,
      description,
      price: Number(price),
      quantity: Number(quantity),
      image: imageUrl,
      productOrigin,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully ✅",
      product,
    });
  } catch (err: unknown) {
    console.error("❌ Add product error:", err);
    res
      .status(500)
      .json({ message: "Server error", error: getErrorMessage(err) });
  }
};

export const updateProduct = async (req: MulterRequest, res: Response) => {
  const productId = req.params.id;
  const { name, description, price, quantity, productModel, productOrigin } =
    req.body;
  const imageUrl = req.file?.path;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name !== undefined) product.name = name;
    if (productModel !== undefined) product.productModel = productModel;
    if (productOrigin !== undefined) product.productOrigin = productOrigin;
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
    res
      .status(500)
      .json({ message: "Server error", error: getErrorMessage(err) });
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
    res
      .status(500)
      .json({ message: "Server error", error: getErrorMessage(err) });
  }
};

// Helper to extract message from unknown error
function getErrorMessage(err: unknown): string {
  return err && typeof err === "object" && "message" in err
    ? String((err as any).message)
    : String(err);
}
