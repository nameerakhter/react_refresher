import mongoose from "mongoose";

// =============================================================================
// Connection string
// =============================================================================
// This tells Mongoose WHERE your database lives.
//
// Local MongoDB:  mongodb://127.0.0.1:27017/course_store
//                 └─ host          └─ port  └─ database name (created on first save)
//
// Atlas (cloud):  put your URI in server/.env as MONGODB_URI=...
// Bun loads .env automatically.

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/course_store";

// =============================================================================
// STEP 1 — Connect to MongoDB (nothing else)
// =============================================================================

async function step1_connect() {
  console.log("Step 1: connecting to MongoDB...");
  console.log("Using URI:", MONGODB_URI);

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 2 — User schema + insert one user
// =============================================================================
// Goal: define a model and save a document to the "users" collection.
// Comment out step 1 above, uncomment step 2 below. Run: bun run demo

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

async function step2_insertUser() {
  console.log("Step 2: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const user = await User.create({
    name: "Alice",
    email: "alice@example.com",
    role: "student",
  });

  console.log("Inserted user:", user);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 3 — Read users from the database
// =============================================================================
// Goal: fetch documents you saved earlier.
// Comment out previous step, uncomment step 3 below. Run: bun run demo

async function step3_readUsers() {
  console.log("Step 3: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const users = await User.find();
  console.log("All users:", users);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 4 — Update a user
// =============================================================================
// Goal: change a document that already exists.
// Comment out previous step, uncomment step 4 below. Run: bun run demo

async function step4_updateUser() {
  console.log("Step 4: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const updated = await User.findOneAndUpdate(
    { email: "alice@example.com" },
    { name: "Alice Johnson" },
    { new: true }
  );

  console.log("Updated user:", updated);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 5 — Delete a user
// =============================================================================
// Goal: remove a document from the collection.
// Comment out previous step, uncomment step 5 below. Run: bun run demo

async function step5_deleteUser() {
  console.log("Step 5: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const deleted = await User.findOneAndDelete({ email: "alice@example.com" });
  console.log("Deleted user:", deleted);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 6 — Course schema + insert one course
// =============================================================================
// Goal: second model for the course-selling site.
// Comment out previous step, uncomment step 6 below. Run: bun run demo

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  instructor: String,
  published: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function step6_insertCourse() {
  console.log("Step 6: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const course = await Course.create({
    title: "React Fundamentals",
    description: "Learn React from scratch.",
    price: 49.99,
    instructor: "Bob",
    published: true,
  });

  console.log("Inserted course:", course);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 7 — Update a course
// =============================================================================
// Comment out previous step, uncomment step 7 below. Run: bun run demo

async function step7_updateCourse() {
  console.log("Step 7: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const updated = await Course.findOneAndUpdate(
    { title: "React Fundamentals" },
    { price: 39.99 },
    { new: true }
  );

  console.log("Updated course:", updated);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// STEP 8 — Delete a course
// =============================================================================
// Comment out previous step, uncomment step 8 below. Run: bun run demo

async function step8_deleteCourse() {
  console.log("Step 8: connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to database:", mongoose.connection.name);

  const deleted = await Course.findOneAndDelete({
    title: "React Fundamentals",
  });
  console.log("Deleted course:", deleted);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

// =============================================================================
// Run ONE step at a time — comment/uncomment the line you want
// =============================================================================

// await step1_connect();
// await step2_insertUser();
// await step3_readUsers();
// await step4_updateUser();
// await step5_deleteUser();
// await step6_insertCourse();
// await step7_updateCourse();
// await step8_deleteCourse();
