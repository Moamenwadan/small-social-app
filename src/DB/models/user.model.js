// import { object, string } from "joi";
import { Schema, model } from "mongoose";
import { type } from "os";
export const genders = {
  male: "male",
  female: "female",
};
export const roles = {
  user: "user",
  admin: "admin",
};

const userSchema = new Schema(
  {
    userName: { type: String, minLength: 3, maxLength: 20, required: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: [true, "email must be unique"],
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: { type: String, required: true },
    gender: { type: String, enum: Object.values(genders) },
    isActivated: { type: Boolean, default: false },
    phone: { type: String },
    role: { type: String, enum: Object.values(roles), default: roles.user },
    changePasswordTime: { type: Date },
    deleted: { type: Boolean, default: false },
    image: { secure_url: String, public_id: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
