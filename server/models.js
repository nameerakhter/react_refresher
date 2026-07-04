import mongoose from "mongoose";

export const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/course_store";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  instructor: String,
  published: Boolean,
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
