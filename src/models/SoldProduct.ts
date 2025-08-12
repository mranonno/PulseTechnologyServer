import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface ISoldProduct extends Document {
  productDetails: {
    name: string;
    productModel: string;
    serialNumber: string;
    price: number;
    soldDate: Date;
  };
  customerDetails: {
    name: string;
    contactNo: string;
    address: string;
  };
  description?: string;
  soldBy: IUser["_id"];
}

const SoldProductSchema = new Schema<ISoldProduct>(
  {
    productDetails: {
      name: { type: String, required: true },
      productModel: { type: String, required: true },
      serialNumber: { type: String, required: true },
      price: { type: Number, required: true },
      soldDate: { type: Date, required: true },
    },
    customerDetails: {
      name: { type: String, required: true },
      contactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    description: { type: String },
    soldBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISoldProduct>("SoldProduct", SoldProductSchema);
