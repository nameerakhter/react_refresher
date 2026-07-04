# Backend + MongoDB

Learn MongoDB with scripts first. Then learn why real apps need a **server + Hono**.

---

## Why do we need Hono? (simple answer)

### What we did before (`mongoose.js`)

You run a script on your laptop:

```bash
bun run demo
```

It connects to MongoDB, adds data, and **stops**.

![Script way — runs once on your laptop, then stops](images/script-vs-real-app.png)

**Good for:** learning how MongoDB works.  
**Bad for a real website because:**

- The script **stops** after it runs. It is not always on.
- **Only you** can run it. Users on your site cannot.
- A **React app in the browser cannot connect to MongoDB**. Browsers are not allowed to hold your DB password.
- If you put the password in React, **anyone can steal it** from the browser.

### What we do now (`index.js` + Hono)

Hono is a **web server**. It stays running and waits for requests.

![Real app — server always on, users can request data](images/real-app-flow.png)

```
User clicks "Add course" in React
        ↓
React sends: POST http://localhost:3000/courses
        ↓
Hono server gets the request
        ↓
Mongoose saves to MongoDB
        ↓
Hono sends JSON back to React
```

**This is how real apps work.**

### Why React cannot talk to MongoDB directly

![React cannot connect straight to MongoDB — must go through Hono](images/why-hono-needed.png)

| | Script (`mongoose.js`) | Real app (`index.js` + Hono) |
| --- | --- | --- |
| Who runs it? | You, manually | Server, always on |
| Can website users use it? | No | Yes |
| Works with React? | No | Yes |
| DB password safe? | On your laptop only | Hidden on server |

---

## Setup

```bash
cd server
bun install
cp .env.example .env   # only if you need Atlas or a custom URI
```

---

## Part 1 — MongoDB scripts (`mongoose.js`)

Learn connect, insert, read, update, delete **in code on your laptop**.

```bash
bun run demo
```

Uncomment one step at a time at the bottom of `mongoose.js`.

---

## Part 2 — HTTP API (Hono)

Two files — use both when teaching:

| File | Purpose | Run with |
| ---- | ------- | -------- |
| `index.step-by-step.example.js` | **Learning** — build APIs one step at a time | `bun run dev:learning` |
| `index.js` | **Real app** — all routes on, like production | `bun run dev` |

### Real app

```bash
bun run dev
```

All endpoints work at the same time.

### Routes

| Method | Route | What it does |
| ------ | ----- | ------------ |
| GET | `/` | Health check |
| GET | `/users` | List all users |
| POST | `/users` | Create a user |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |
| GET | `/courses` | List all courses |
| POST | `/courses` | Create a course |
| PATCH | `/courses/:id` | Update a course |
| DELETE | `/courses/:id` | Delete a course |

### Try it

**Create a user**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\",\"role\":\"student\"}"
```

**Get all users**
```bash
curl http://localhost:3000/users
```

**Create a course**
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"React 101\",\"description\":\"Basics\",\"price\":49.99,\"instructor\":\"Bob\",\"published\":true}"
```

**Update** — copy `_id` from a response:
```bash
curl -X PATCH http://localhost:3000/users/PASTE_ID_HERE \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice Johnson\"}"
```

**Delete**
```bash
curl -X DELETE http://localhost:3000/users/PASTE_ID_HERE
```

Use [Postman](https://www.postman.com/) or Thunder Client if you prefer a UI.

---

## Files

| File | Purpose |
| ---- | ------- |
| `models.js` | User + Course schemas |
| `mongoose.js` | Learn MongoDB with scripts (your laptop only) |
| `index.step-by-step.example.js` | Learn APIs step by step |
| `index.js` | Real Hono server (for your website) |
| `images/` | Diagrams explaining script vs real app |

## Next step

Call these APIs from your React app with `fetch`.
