import mongoose, { Schema, Document } from "mongoose";

export interface IStockHistory extends Document {
  name: string;
  date: Date;
  type: "in" | "out";
  stockQuantity: number;
  productId: mongoose.Types.ObjectId;
  image?: string;
  user: {
    fullName: string;
  };
}

const StockHistorySchema = new Schema<IStockHistory>(
  {
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["in", "out"], required: true },
    stockQuantity: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    image: { type: String },
    user: {
      fullName: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStockHistory>(
  "StockHistory",
  StockHistorySchema
);
