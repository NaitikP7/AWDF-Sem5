const Task = require("../models/Task");

const formatValidationError = (err) => {
  return Object.values(err.errors).map((e) => ({
    field: e.path,
    message: e.message,
  }));
};

const addLinks = (task) => {
  const obj = task.toObject ? task.toObject() : task;
  return {
    ...obj,
    _links: {
      self: `/tasks/${obj._id}`,
      delete: `/tasks/${obj._id}`,
    },
  };
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks.map(addLinks) });
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      const err = new Error(`Task with id '${req.params.id}' not found.`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: addLinks(task) });
  } catch (err) {
    if (err.name === "CastError") {
      err.statusCode = 400;
      err.message = `Invalid task id: '${req.params.id}'.`;
    }
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({ title, description, completed, user: req.user.id });
    res.location(`/tasks/${task._id}`);
    res.status(201).json({ success: true, message: "Task created successfully.", data: addLinks(task) });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: { message: "Validation failed.", details: formatValidationError(err) },
      });
    }
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, updates, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!task) {
      const err = new Error(`Task with id '${req.params.id}' not found.`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Task updated successfully.", data: addLinks(task) });
  } catch (err) {
    if (err.name === "CastError") {
      err.statusCode = 400;
      err.message = `Invalid task id: '${req.params.id}'.`;
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: { message: "Validation failed.", details: formatValidationError(err) },
      });
    }
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      const err = new Error(`Task with id '${req.params.id}' not found.`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Task deleted successfully.", data: addLinks(task) });
  } catch (err) {
    if (err.name === "CastError") {
      err.statusCode = 400;
      err.message = `Invalid task id: '${req.params.id}'.`;
    }
    next(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
