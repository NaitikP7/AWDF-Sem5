const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    const err = new Error("Task title is required");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

const validateTaskUpdate = (req, res, next) => {
  const allowedFields = ["title", "description", "completed"];
  const hasUpdate = allowedFields.some((field) => Object.prototype.hasOwnProperty.call(req.body, field));
  if (!hasUpdate) {
    const err = new Error("At least one task field must be provided");
    err.statusCode = 400;
    return next(err);
  }
  if (Object.prototype.hasOwnProperty.call(req.body, "title") &&
      (typeof req.body.title !== "string" || req.body.title.trim() === "")) {
    const err = new Error("Task title cannot be empty");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

module.exports = { validateTask, validateTaskUpdate };
