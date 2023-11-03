const taskService = require("../services/TaskService");
const { validationResult } = require("express-validator");

// Define controller methods for each route
exports.getAllTasks = (req, res) => {
  const { tasks } = taskService.getAllTasks();
  return res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  const task = taskService.getTaskById(id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(task);
  }
};

exports.createTask = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, completed } = req.body;
  const newTask = {
    title,
    description,
    completed: completed || false,
  };
  taskService.createTask(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = taskService.getTaskById(id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    taskService.updateTask(id, {
      title: title || task.title,
      description: description || task.description,
      completed: completed || task.completed,
    });
    res.json({ message: "Task updated successfully" });
  }
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const task = taskService.getTaskById(id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    taskService.deleteTask(id);
    res.json({ message: "Task deleted successfully" });
  }
};
