// =============================================================================
// HOW REACT TALKS TO THE SERVER
// =============================================================================
//
// React runs in the browser. It cannot connect to MongoDB directly.
// Instead it sends HTTP requests to your Hono server (server/index.js).
//
// Flow:
//   User clicks "Add course" in React
//         ↓
//   createCourse() below runs fetch("POST", "/api/courses", body)
//         ↓
//   Vite dev proxy forwards /api → http://localhost:3000 (see vite.config.js)
//         ↓
//   Hono receives the request → Mongoose saves to MongoDB → JSON response
//         ↓
//   React gets the JSON and updates the screen
//
// In production you would point API_BASE at your deployed server URL.
// =============================================================================

const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error ?? `Request failed (${response.status})`);
  }

  return response.json();
}

// --- courses ---

export function getCourses() {
  return request("/courses");
}

export function createCourse(course) {
  return request("/courses", {
    method: "POST",
    body: JSON.stringify(course),
  });
}

export function deleteCourse(id) {
  return request(`/courses/${id}`, {
    method: "DELETE",
  });
}

// --- users (same pattern as courses) ---

export function getUsers() {
  return request("/users");
}

export function createUser(user) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function deleteUser(id) {
  return request(`/users/${id}`, {
    method: "DELETE",
  });
}
