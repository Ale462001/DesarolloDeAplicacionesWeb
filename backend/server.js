const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
const API_KEY = "12345";



mongoose.connect("mongodb://127.0.0.1:27017/todolist")
.then(() => {
  console.log("Conectado a MongoDB");
})
.catch((error) => {
  console.log(error);
});



const taskSchema = new mongoose.Schema({
  title: String,
  deadline: String,
});

const Task = mongoose.model("Task", taskSchema);



const goalSchema = new mongoose.Schema({
  title: String,
  deadline: String,
});

const Goal = mongoose.model("Goal", goalSchema);



app.use((req, res, next) => {

  const apiKey = req.headers["x-api-key"];

  if (apiKey !== API_KEY) {
    return res.status(401).json({
      message: "API KEY incorrecta",
    });
  }

  next();
});



app.get("/getTasks", async (req, res) => {

  const tasks = await Task.find();

  res.status(200).json(tasks);
});



app.post("/addTask", async (req, res) => {

  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({
      message: "Parámetros incorrectos",
    });
  }

  const newTask = new Task({
    title,
    deadline,
  });

  await newTask.save();

  res.status(200).json({
    message: "Tarea agregada correctamente",
    task: newTask,
  });
});



app.delete("/removeTask/:id", async (req, res) => {

  const id = req.params.id;

  const taskExists = await Task.findById(id);

  if (!taskExists) {
    return res.status(400).json({
      message: "La tarea no existe",
    });
  }

  await Task.findByIdAndDelete(id);

  res.status(200).json({
    message: "Tarea eliminada correctamente",
  });
});



app.get("/getGoals", async (req, res) => {

  const goals = await Goal.find();

  res.status(200).json(goals);
});



app.post("/addGoal", async (req, res) => {

  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({
      message: "Parámetros incorrectos",
    });
  }

  const newGoal = new Goal({
    title,
    deadline,
  });

  await newGoal.save();

  res.status(200).json({
    message: "Meta agregada correctamente",
    goal: newGoal,
  });
});



app.delete("/removeGoal/:id", async (req, res) => {

  const id = req.params.id;

  const goalExists = await Goal.findById(id);

  if (!goalExists) {
    return res.status(400).json({
      message: "La meta no existe",
    });
  }

  await Goal.findByIdAndDelete(id);

  res.status(200).json({
    message: "Meta eliminada correctamente",
  });
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});