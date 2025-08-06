import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
}

const userSchema: Schema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "staff"], default: "staff" },
});

export default mongoose.model<IUser>("User", userSchema);
