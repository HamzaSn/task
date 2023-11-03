const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

const app = express();
app.use(express.json());

const dbFilePath = "./data/tasks.json";

function readTasks() {
  try {
    const data = fs.readFileSync(dbFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { tasks: [] };
  }
}

function writeTasks(tasks) {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(dbFilePath, data);
}

// Get all tasks
app.get("/tasks", (req, res) => {
  const { tasks } = readTasks();
  res.json(tasks);
});

// Get a task by ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { tasks } = readTasks();
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(task);
  }
});

// Create a new task
app.post("/tasks", body("title").not().isEmpty(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, completed } = req.body;
  const tasks = readTasks();
  const newTask = {
    id: tasks.tasks.length + 1,
    title,
    description,
    completed: completed || false,
  };
  tasks.tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.tasks[taskIndex] = {
    ...tasks.tasks[taskIndex],
    title: title || tasks.tasks[taskIndex].title,
    description: description || tasks.tasks[taskIndex].description,
    completed: completed || tasks.tasks[taskIndex].completed,
  };

  writeTasks(tasks);
  res.json(tasks.tasks[taskIndex]);
});

// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
