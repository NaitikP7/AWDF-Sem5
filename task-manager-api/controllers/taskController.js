let tasks = [
  { id: 1, title: "Set up Express server", completed: true },
  { id: 2, title: "Build REST API endpoints", completed: false },
];

let nextId = tasks.length + 1;

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const getAllTasks = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const createTask = (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return next(createError("Task title is required.", 400));
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      completed: false,
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return next(createError(`Task with id ${taskId} not found.`, 404));
    }

    const { title, completed } = req.body;

    if (title !== undefined) tasks[taskIndex].title = title.trim();
    if (completed !== undefined) tasks[taskIndex].completed = Boolean(completed);

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: tasks[taskIndex],
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return next(createError(`Task with id ${taskId} not found.`, 404));
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      data: deletedTask,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
