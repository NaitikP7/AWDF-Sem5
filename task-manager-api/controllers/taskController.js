let tasks = [
  { id: 1, title: "Set up Express server", completed: true },
  { id: 2, title: "Build REST API endpoints", completed: false },
];

let nextId = tasks.length + 1;

const addLinks = (task) => ({
  ...task,
  _links: {
    self: `/tasks/${task.id}`,
    delete: `/tasks/${task.id}`,
  },
});

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const getAllTasks = (req, res, next) => {
  try {
    const tasksWithLinks = tasks.map((t) => addLinks(t));
    res.status(200).json({
      success: true,
      count: tasksWithLinks.length,
      data: tasksWithLinks,
    });
  } catch (err) {
    next(err);
  }
};

const getTaskById = (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return next(createError(`Task with id ${taskId} not found.`, 404));
    }

    res.status(200).json({
      success: true,
      data: addLinks(task),
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

    res.location(`/tasks/${newTask.id}`);
    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: addLinks(newTask),
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
      data: addLinks(tasks[taskIndex]),
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
      data: addLinks(deletedTask),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
