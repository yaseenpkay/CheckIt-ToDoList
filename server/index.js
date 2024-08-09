// checkit/server/index.js
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 5000;

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [
  {
    id: "1",
    name: "task name 1",
    description: "task description 1",
    priority: "High",
    completed: false,
    section: "Inbox",
    date: "2024-08-03",
  },
  {
    id: "2",
    name: "test",
    description: "testing",
    priority: "High",
    completed: false,
    section: "Inbox",
    date: "2024-08-03",
  },
];

let section = [
  { id: "1", sectionName: "Project 1" },
  { id: "2", sectionName: "Project 2" },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/section", (req, res) => {
  res.json(section);
});

app.post("/section", (req, res) => {
  const newSection = {
    id: String(Date.now()),
    sectionName: req.body.sectionName,
  };
  section.push(newSection);
  res.status(201).json(newSection);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: String(Date.now()),
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed || false,
    priority: req.body.priority,
    section: req.body.section,
    date: req.body.date,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (task) {
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;
    task.priority = req.body.priority || task.priority;
    task.date = req.body.date || task.date;
    task.section = req.body.section || task.section;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.put("/section/:id", (req, res) => {
  const sections = section.find((s) => s.id === req.params.id);
  if (sections) {
    sections.sectionName = req.body.sectionName || sections.sectionName;
    res.json(sections);
  } else {
    res.status(404).json({ message: "section not found" });
  }
});

app.delete("/section/:id", (req, res) => {
  const sectionId = req.params.id;
  const initialLength = section.length;
  section = section.filter((s) => s.id !== sectionId);

  if (section.length < initialLength) {
    console.log(`Section with ID ${sectionId} deleted successfully.`);
    res.status(204).end();
  } else {
    console.log(`Section with ID ${sectionId} not found.`);
    res.status(404).send("Section not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  console.log(`Deleting task with ID: ${taskId}`);

  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== taskId);

  if (tasks.length < initialLength) {
    console.log(`Task with ID ${taskId} deleted successfully.`);
    res.status(204).end();
  } else {
    console.log(`Task with ID ${taskId} not found.`);
    res.status(404).send("Task not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
