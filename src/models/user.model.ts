
import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;
  avatar_image_url?: string;
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  avatar_image_url: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

export const parserUser = (user: IUser) => {
  return {
    _id: user._id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    created_at: user.created_at,
    avatar_image_url: user.avatar_image_url,
  };
};

export default User;
