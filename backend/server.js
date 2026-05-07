const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const API_KEY = "12345";

let tasks = [];
let goals = [];


app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== API_KEY) {
    return res.status(401).json({
      message: "API KEY incorrecta",
    });
  }

  next();
});


app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});


app.post("/tasks", (req, res) => {
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({
      message: "Parámetros incorrectos",
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    deadline,
  };

  tasks.push(newTask);

  res.status(200).json({
    message: "Tarea agregada correctamente",
    task: newTask,
  });
});


app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskExists = tasks.find((task) => task.id === id);

  if (!taskExists) {
    return res.status(400).json({
      message: "La tarea no existe",
    });
  }

  tasks = tasks.filter((task) => task.id !== id);

  res.status(200).json({
    message: "Tarea eliminada correctamente",
  });
});


app.get("/goals", (req, res) => {
  res.status(200).json(goals);
});


app.post("/goals", (req, res) => {
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({
      message: "Parámetros incorrectos",
    });
  }

  const newGoal = {
    id: Date.now(),
    title,
    deadline,
  };

  goals.push(newGoal);

  res.status(200).json({
    message: "Meta agregada correctamente",
    goal: newGoal,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});