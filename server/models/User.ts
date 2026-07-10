import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Clerk ID
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    credits: { type: Number, default: 20 },
    paymentSessions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
