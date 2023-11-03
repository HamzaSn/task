const fs = require("fs");
const dbFilePath = "./data/tasks.json";
const readTasks = require("../helpers").readTasks;
const writeTasks = require("../helpers").writeTasks;
// Define service methods for handling tasks
exports.getAllTasks = () => {
  const tasks = readTasks();
  return tasks;
};

exports.getTaskById = (id) => {
  const tasks = readTasks().tasks;
  const task = tasks.find((t) => t.id === parseInt(id));
  return task;
};

exports.createTask = (task) => {
  const tasks = readTasks().tasks;
  tasks.tasks.push({ ...task, id: (tasks.length ?? 0) + 1 });
  writeTasks(tasks);
};

exports.updateTask = (id, task) => {
  const tasks = readTasks();
  const taskIndex = tasks.tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return null;
  }

  tasks.tasks[taskIndex] = {
    ...tasks.tasks[taskIndex],
    title: task.title || tasks.tasks[taskIndex].title,
    description: task.description || tasks.tasks[taskIndex].description,
    completed: task.completed || tasks.tasks[taskIndex].completed,
  };

  writeTasks(tasks);
};

exports.deleteTask = (id) => {
  const tasks = readTasks();
  const taskIndex = tasks.tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return null;
  }

  tasks.tasks.splice(taskIndex, 1);
  writeTasks(tasks);
};
