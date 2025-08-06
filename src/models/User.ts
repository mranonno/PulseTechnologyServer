import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
  createdAt: Date;
}

const userSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
  },
  {
    timestamps: true, // ⬅️ Enables createdAt and updatedAt automatically
  }
);

export default mongoose.model<IUser>("User", userSchema);
