import "./App.css";
import { useState } from "react";
import { createCourse, deleteCourse, getCourses } from "./api.js";

const emptyCourseForm = {
  title: "",
  description: "",
  price: "",
  instructor: "",
};

function App() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyCourseForm);
  const [status, setStatus] = useState("Click “Load courses” to fetch from the server.");
  const [loading, setLoading] = useState(false);

  async function onLoadCourses() {
    setLoading(true);
    setStatus("Loading courses from http://localhost:3000/courses …");

    try {
      const data = await getCourses();
      setCourses(data);
      setStatus(`Loaded ${data.length} course(s) from the server.`);
    } catch (error) {
      setStatus(
        `Could not reach the server. Is it running? (cd server && bun run dev)\n${error.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  async function onAddCourse(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("Sending POST /courses to the server …");

    try {
      const course = await createCourse({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        instructor: form.instructor,
        published: true,
      });

      setForm(emptyCourseForm);
      setStatus(
        `Created “${course.title}” (POST only). Click “Load courses” to refresh the list.`
      );
    } catch (error) {
      setStatus(`Could not create course.\n${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteCourse(id, title) {
    setLoading(true);
    setStatus(`Sending DELETE /courses/${id} …`);

    try {
      await deleteCourse(id);
      setCourses((current) => current.filter((course) => course._id !== id));
      setStatus(`Deleted “${title}”.`);
    } catch (error) {
      setStatus(`Could not delete course.\n${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function onFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <main id="center">
      <header className="page-header">
        <h1>Course Store</h1>
        <p className="subtitle">
          React (browser) → fetch → Hono (server) → MongoDB
        </p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Courses</h2>
          <button
            type="button"
            className="btn"
            onClick={onLoadCourses}
            disabled={loading}
          >
            Load courses
          </button>
        </div>

        {courses.length === 0 ? (
          <p className="empty">No courses loaded yet.</p>
        ) : (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course._id} className="course-card">
                <div>
                  <strong>{course.title}</strong>
                  <p>{course.description}</p>
                  <p className="meta">
                    ${course.price} · {course.instructor}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeleteCourse(course._id, course.title)}
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>Add a course</h2>
        <form className="course-form" onSubmit={onAddCourse}>
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={onFieldChange}
              required
            />
          </label>
          <label>
            Description
            <input
              name="description"
              value={form.description}
              onChange={onFieldChange}
              required
            />
          </label>
          <label>
            Price
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onFieldChange}
              required
            />
          </label>
          <label>
            Instructor
            <input
              name="instructor"
              value={form.instructor}
              onChange={onFieldChange}
              required
            />
          </label>
          <button type="submit" className="btn" disabled={loading}>
            Add course
          </button>
        </form>
      </section>

      <p className="status" role="status">
        {status}
      </p>
    </main>
  );
}

export default App;
