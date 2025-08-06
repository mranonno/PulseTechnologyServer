import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  quantity: number;
  status: "available" | "sold" | "service";
  createdAt: Date;
}

const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["available", "sold", "service"],
    default: "available",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", productSchema);
