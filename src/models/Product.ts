import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
