const request = require("supertest");
const app = require("./server");

// Mock the auth middleware so tests don't require a real DB or token
jest.mock("./middleware/authMiddleware", () => ({
  protect: (req, res, next) => {
    req.user = { id: "test-user-id", email: "test@example.com" };
    next();
  },
}));

// Mock the task controller
jest.mock("./controllers/taskController", () => ({
  getAllTasks: (req, res) => {
    res.status(200).json({
      success: true,
      count: 1,
      data: [
        {
          _id: "task-123",
          title: "Sample Test Task",
          description: "Testing CI/CD pipeline",
          completed: false,
          _links: {
            self: "/tasks/task-123",
            delete: "/tasks/task-123",
          },
        },
      ],
    });
  },
  getTaskById: (req, res) => res.status(200).json({ success: true }),
  createTask: (req, res) => res.status(201).json({ success: true }),
  updateTask: (req, res) => res.status(200).json({ success: true }),
  deleteTask: (req, res) => res.status(200).json({ success: true }),
}));

describe("Task Management API - CI/CD Automated Tests", () => {
  // Test root health/info endpoint
  test("GET / returns 200 and API status", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Task Manager API is running");
  });

  // Test GET /tasks endpoint (as required by Practical 12)
  test("GET /tasks returns 200", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
