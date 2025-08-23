import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  productModel: string;
  productOrigin: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    productModel: { type: String },
    productOrigin: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
