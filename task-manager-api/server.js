require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running",
    endpoints: {
      getAllTasks: "GET    /tasks",
      getTaskById: "GET    /tasks/:id",
      createTask: "POST   /tasks",
      updateTask: "PUT    /tasks/:id",
      deleteTask: "DELETE /tasks/:id",
    },
  });
});

app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
