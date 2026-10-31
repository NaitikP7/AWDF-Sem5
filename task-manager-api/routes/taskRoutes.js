const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { validateTask, validateTaskUpdate } = require("../middleware/validationMiddleware");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/")
  .get(protect, getAllTasks)
  .post(protect, validateTask, createTask);

router.route("/:id")
  .get(protect, getTaskById)
  .put(protect, validateTaskUpdate, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
