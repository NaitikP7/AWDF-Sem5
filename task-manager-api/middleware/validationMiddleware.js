const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    const err = new Error("Task title is required");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

module.exports = { validateTask };
