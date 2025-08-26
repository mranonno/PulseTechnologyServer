import mongoose, { Schema, Document } from "mongoose";

export interface IPriceList extends Document {
  name: string;
  price1: number;
  price2: number;
  price3: number;
  vendorName: string;
}

const PriceListSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price1: { type: Number },
    price2: { type: Number },
    price3: { type: Number },
    vendorName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPriceList>("PriceList", PriceListSchema);
