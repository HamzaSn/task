const dbFilePath = "./data/tasks.json";
const fs = require("fs");

exports.readTasks = () => {
  try {
    const data = fs.readFileSync(dbFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { tasks: [] };
  }
};

exports.writeTasks = (tasks) => {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(dbFilePath, data);
};
