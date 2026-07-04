# Backend + MongoDB — step by step

Two learning tracks in this folder, both using **Bun**.

## Setup

```bash
cd server
bun install
cp .env.example .env   # only if you need Atlas or a custom URI
```

---

## Part 1 — MongoDB scripts (`mongoose.js`)

Learn connect, insert, read, update, delete **directly in code**.

```bash
bun run demo
```

Uncomment one step at a time at the bottom of `mongoose.js`.

---

## Part 2 — HTTP API with Hono (`index.js`)

Learn how a **backend server** works: it listens for HTTP requests, talks to MongoDB, and sends JSON back.

```bash
bun run dev
```

Uncomment one step at a time at the bottom of `index.js`.

| Step | What you learn |
| ---- | -------------- |
| 1 | Basic server — `GET /` returns JSON |
| 2 | Connect to MongoDB when server starts |
| 3 | `GET /users` — read from DB via API |
| 4 | `POST /users` — create via API |
| 5 | `PATCH /users/:id` and `DELETE /users/:id` |
| 6 | Full `/courses` CRUD (same pattern) |

### How an API request flows

```
Browser / Postman / React app
        ↓  HTTP request (GET, POST, etc.)
   Hono server (index.js)
        ↓  User.find() / User.create() / etc.
      MongoDB
        ↓  JSON response
   back to the client
```

### Try the APIs

With step 6 running (`bun run dev`):

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

**Update** — copy `_id` from the response, then:
```bash
curl -X PATCH http://localhost:3000/users/PASTE_ID_HERE \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice Johnson\"}"
```

**Delete**
```bash
curl -X DELETE http://localhost:3000/users/PASTE_ID_HERE
```

You can also use [Postman](https://www.postman.com/) or the Thunder Client VS Code extension instead of curl.

---

## Files

| File | Purpose |
| ---- | ------- |
| `models.js` | User + Course schemas (shared by scripts and API) |
| `mongoose.js` | MongoDB learning steps (run once, then exit) |
| `index.js` | Hono API learning steps (server stays running) |

## Next step

Call these APIs from your React app with `fetch`.
