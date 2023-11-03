const express = require("express");
const app = express();
app.use(express.json());

const taskRoutes = require("./src/routes/TaskRoutes");
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
