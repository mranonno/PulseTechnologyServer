import mongoose, { Schema, Document } from "mongoose";

export interface IPriceList extends Document {
  name: string;
  price1: string;
  price2: string;
  price3: string;
  vendorName: string;
}

const PriceListSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price1: { type: String },
    price2: { type: String },
    price3: { type: String },
    vendorName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPriceList>("PriceList", PriceListSchema);
