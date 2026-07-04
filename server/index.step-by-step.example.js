// LEARNING VERSION — one API step at a time (comment/uncomment to run each step)
// Compare with index.js which runs ALL routes like a real app.
//
// Run: bun run dev:learning

import { Hono } from "hono";
import mongoose from "mongoose";
import { MONGODB_URI, User, Course } from "./models.js";

const app = new Hono();
const PORT = 3000;

function startServer() {
  console.log(`Server running at http://localhost:${PORT}`);
  Bun.serve({ port: PORT, fetch: app.fetch });
}

// =============================================================================
// STEP 1 — A basic backend server (no database yet)
// =============================================================================
// Goal: see that a backend is just a program that listens for HTTP requests.
// Try: open http://localhost:3000 in the browser

function step1_basicServer() {
  app.get("/", (c) => {
    return c.json({ message: "API is running" });
  });

  startServer();
}

// =============================================================================
// STEP 2 — Connect to MongoDB when the server starts
// =============================================================================
// Goal: keep one DB connection open while the server runs (unlike the scripts).
// Comment out step 1, uncomment step 2.

async function step2_connectDB() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  app.get("/", (c) => {
    return c.json({
      message: "API is running",
      database: mongoose.connection.name,
    });
  });

  startServer();
}

// =============================================================================
// STEP 3 — GET /users (read data through an API)
// =============================================================================
// Goal: browser or Postman hits your server → server reads from MongoDB → JSON back.
// Try: GET http://localhost:3000/users

async function step3_getUsers() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  app.get("/users", async (c) => {
    const users = await User.find();
    return c.json(users);
  });

  startServer();
}

// =============================================================================
// STEP 4 — POST /users (add data through an API)
// =============================================================================
// Goal: send JSON in the request body → server saves it with User.create().
//
// Try:
// curl -X POST http://localhost:3000/users \
//   -H "Content-Type: application/json" \
//   -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\",\"role\":\"student\"}"

async function step4_postUsers() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  app.get("/users", async (c) => {
    const users = await User.find();
    return c.json(users);
  });

  app.post("/users", async (c) => {
    const body = await c.req.json();
    const user = await User.create(body);
    console.log("Created user:", user);
    return c.json(user, 201);
  });

  startServer();
}

// =============================================================================
// STEP 5 — PATCH and DELETE /users/:id
// =============================================================================
//
// PATCH  http://localhost:3000/users/PASTE_ID_HERE  body: {"name":"Alice Johnson"}
// DELETE http://localhost:3000/users/PASTE_ID_HERE

async function step5_userCrud() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

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

  startServer();
}

// =============================================================================
// STEP 6 — Course APIs (same pattern as users)
// =============================================================================
//
// GET    http://localhost:3000/courses
// POST   http://localhost:3000/courses
// PATCH  http://localhost:3000/courses/PASTE_ID_HERE
// DELETE http://localhost:3000/courses/PASTE_ID_HERE

async function step6_courseApis() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  app.get("/users", async (c) => c.json(await User.find()));

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

  app.get("/courses", async (c) => c.json(await Course.find()));

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

  startServer();
}

// =============================================================================
// Run ONE step at a time — comment/uncomment the line you want
// =============================================================================

step1_basicServer();
// step2_connectDB();
// step3_getUsers();
// step4_postUsers();
// step5_userCrud();
// step6_courseApis();
