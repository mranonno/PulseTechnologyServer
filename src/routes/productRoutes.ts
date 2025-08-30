import express from "express";
import {
  addProduct,
  allProduct,
  deleteProduct,
  updateProduct,
  updateStock,
} from "../controllers/productController";
import { upload } from "../middleware/uploadCloudinary";
import { protect } from "../middleware/authMiddleware";
import {
  validateAddProduct,
  validateUpdateProduct,
} from "../middleware/validationMiddleware";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  validateAddProduct,
  addProduct
);
router.get("/", allProduct);
router.delete("/:id", protect, deleteProduct);
router.patch("/stock/:id", protect, updateStock);
router.put(
  "/:id",
  protect,
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    next();
  },
  upload.single("image"),
  validateUpdateProduct,
  updateProduct
);

export default router;
