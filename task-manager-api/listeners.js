const taskEvents = require("./events");

// Register listener for 'task-created' event
taskEvents.on("task-created", (task) => {
  console.log(`[Listener] 'task-created' event received at ${new Date().toISOString()}`);

  // Artificial delay (2000ms) simulating async background notification / email delivery
  setTimeout(() => {
    console.log(
      `[Notification] Task "${task.title}" (Assigned User: ${task.user}) completed at ${new Date().toISOString()}`
    );
  }, 2000);
});

module.exports = taskEvents;
