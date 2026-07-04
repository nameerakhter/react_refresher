// =============================================================================
// WHY THIS FILE EXISTS (read this first)
// =============================================================================
//
// Before this, we used mongoose.js — a script you run with "bun run demo".
// That is fine for LEARNING. It is NOT how a real website works.
//
// Problem with scripts only:
//   - Script runs once on YOUR laptop, then stops.
//   - Only you can run it. A user on your website cannot.
//   - Your React app in the browser CANNOT talk to MongoDB directly.
//   - You would expose your DB password to everyone (very unsafe).
//
// What Hono does:
//   - Hono is a small web server. It listens for HTTP requests (GET, POST, etc.).
//   - Your React app sends a request → Hono receives it → Mongoose saves to DB.
//   - The server stays ON all the time. Many users can use it at once.
//   - DB password stays on the server. Users never see it.
//
// See images in server/images/ and README for diagrams.
//
// REAL APP — all routes run at once (this is how production servers work)
// Learning version (one step at a time): see index.step-by-step.example.js
// =============================================================================

import { Hono } from "hono";
import mongoose from "mongoose";
import { MONGODB_URI, User, Course } from "./models.js";

const app = new Hono();
const PORT = 3000;

// Connect once when the server starts — stays open while the app runs
console.log("Connecting to MongoDB...");
await mongoose.connect(MONGODB_URI);
console.log("Connected to database:", mongoose.connection.name);

// --- routes ---

app.get("/", (c) => {
  return c.json({
    message: "API is running",
    database: mongoose.connection.name,
  });
});

// users
app.get("/users", async (c) => {
  return c.json(await User.find());
});

app.post("/users", async (c) => {
  const user = await User.create(await c.req.json());
  return c.json(user, 201);
});

app.patch("/users/:id", async (c) => {
  const user = await User.findByIdAndUpdate(
    c.req.param("id"),
    await c.req.json(),
    { new: true }
  );
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

app.delete("/users/:id", async (c) => {
  const user = await User.findByIdAndDelete(c.req.param("id"));
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

// courses
app.get("/courses", async (c) => {
  return c.json(await Course.find());
});

app.post("/courses", async (c) => {
  const course = await Course.create(await c.req.json());
  return c.json(course, 201);
});

app.patch("/courses/:id", async (c) => {
  const course = await Course.findByIdAndUpdate(
    c.req.param("id"),
    await c.req.json(),
    { new: true }
  );
  if (!course) return c.json({ error: "Course not found" }, 404);
  return c.json(course);
});

app.delete("/courses/:id", async (c) => {
  const course = await Course.findByIdAndDelete(c.req.param("id"));
  if (!course) return c.json({ error: "Course not found" }, 404);
  return c.json(course);
});

console.log(`Server running at http://localhost:${PORT}`);
Bun.serve({ port: PORT, fetch: app.fetch });
