# Course Store — React + Hono + MongoDB

A small learning project that shows the **full path** from a React UI in the browser to data saved in MongoDB.

You build it in three layers:

| Layer | Folder | What it does |
| ----- | ------ | ------------ |
| **Database scripts** | `server/mongoose.js` | Learn MongoDB on your laptop (connect, insert, read, update, delete) |
| **HTTP API** | `server/index.js` | A Hono server that stays running and exposes REST routes |
| **React client** | `src/` | UI that calls the API with `fetch` |

**Slides:** [Intro to HTTP](https://petal-estimate-4e9.notion.site/Intro-to-HTTP-26c5803f153b4401aa76e9fac08ac427) — read this first.

**Backend deep dive:** see [`server/README.md`](server/README.md).

---

## Why three layers?

### 1. Scripts (`mongoose.js`) — learn the database

You run a script once. It connects, does work, disconnects, and exits.

**Good for:** understanding how MongoDB stores documents.  
**Not enough for a website:** users cannot run your script, and the browser cannot hold your DB password.

### 2. Server (`index.js` + Hono) — the bridge

Hono is a web server. It listens on a port (3000) and answers HTTP requests (`GET`, `POST`, etc.). When React asks for courses, Hono reads from MongoDB and sends JSON back.

**Why we need it:** React runs in the browser. Browsers are not allowed to connect to MongoDB directly. The server holds the password and talks to the database for you.

### 3. React (`src/`) — what users see

React renders buttons and forms. When you click **Load courses**, it calls `fetch("/api/courses")`. That request goes to Hono, not to MongoDB.

```
User clicks in React
      ↓
fetch("/api/courses")          ← src/api.js
      ↓
Vite proxy → localhost:3000    ← vite.config.js (dev only)
      ↓
Hono GET /courses              ← server/index.js
      ↓
Mongoose → MongoDB
      ↓
JSON back to React → screen updates
```

---

## Quick start (run both)

You need **two terminals** — one for the server, one for React.

### Terminal 1 — backend

```bash
cd server
bun install
cp .env.example .env   # only if you need Atlas or a custom URI
bun run dev            # Hono on http://localhost:3000
```

### Terminal 2 — frontend

```bash
# from project root
bun install
bun run dev            # Vite on http://localhost:5173
```

Open **http://localhost:5173**, click **Load courses**, add a course, delete one. Watch the status message at the bottom — it tells you which HTTP request just ran.

---

## How client and server connect

### `src/api.js` — all HTTP calls live here

React components should not scatter `fetch()` everywhere. `api.js` is the single place that knows:

- which URLs to call (`/api/courses`, `/api/users`, …)
- which HTTP method to use (`GET`, `POST`, `DELETE`)
- how to send JSON in the body
- how to handle errors

```js
// App.jsx calls this:
const courses = await getCourses();

// api.js turns it into:
fetch("/api/courses")
```

**Why separate file?** Same reason `models.js` is separate on the server — one place for data access, UI stays simple.

### `vite.config.js` — dev proxy

In development, React runs on port **5173** and Hono on **3000**. That is two different origins. The proxy makes React think the API is on the same host:

```
Browser:  fetch("/api/courses")
              ↓
Vite:     forwards to http://localhost:3000/courses
              ↓
Hono:     handles GET /courses
```

**Why `/api` prefix?** So Vite knows which requests to forward. Only paths starting with `/api` go to the server. Everything else is your React app.

In production you would deploy React and the API separately and set `API_BASE` in `api.js` to your real server URL.

### CORS on the server

Even with the proxy, the server adds CORS headers so the browser allows requests from `http://localhost:5173`. Without CORS, the browser blocks cross-origin responses even if the server answered correctly.

See `server/index.js` — the `cors()` middleware runs before your routes.

### `src/App.jsx` — UI only talks through `api.js`

- **Load courses** → `getCourses()` → `GET /courses`
- **Add course** (form submit) → `createCourse()` → `POST /courses`
- **Delete** → `deleteCourse(id)` → `DELETE /courses/:id`

Data fetching happens in **event handlers** (button click, form submit), not on page load. That keeps the flow easy to follow while learning. In a real app you might auto-load on mount with a data library or React 19 `use()`.

---

## Project structure

```
react_refresher/
├── src/
│   ├── api.js          # fetch helpers — how React talks to Hono
│   ├── App.jsx         # Course Store UI
│   ├── App.css
│   └── main.jsx        # React entry point
├── server/
│   ├── models.js       # Mongoose schemas (User, Course)
│   ├── mongoose.js     # Learn DB with scripts (step by step)
│   ├── index.js        # Real Hono server (all routes)
│   ├── index.step-by-step.example.js  # Learn APIs one step at a time
│   └── README.md       # Backend + MongoDB guide
├── vite.config.js      # Dev proxy /api → localhost:3000
└── package.json        # React app scripts
```

---

## Learning path

1. **MongoDB basics** — `cd server && bun run demo` with steps in `mongoose.js`
2. **HTTP APIs** — `cd server && bun run dev:learning` with steps in `index.step-by-step.example.js`
3. **Full server** — `cd server && bun run dev` (`index.js`, all routes)
4. **Connect React** — `bun run dev` in root, use the Course Store UI

---

## Scripts

| Command | Where | What |
| ------- | ----- | ---- |
| `bun run dev` | root | Start Vite (React) |
| `bun run build` | root | Production build |
| `bun run dev` | `server/` | Start Hono API |
| `bun run dev:learning` | `server/` | Step-by-step API learning |
| `bun run demo` | `server/` | MongoDB script learning |

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| "Could not reach the server" in the UI | Start the backend: `cd server && bun run dev` |
| Empty course list | Click **Load courses**, or add one with the form |
| MongoDB connection error | Start local MongoDB, or set `MONGODB_URI` in `server/.env` |
| CORS error in browser console | Ensure server is running and CORS is enabled in `index.js` |
