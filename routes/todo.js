const express = require("express");
const router = express.Router();

// Import the to-do list data
const todoList = require("../data/data.json");

// GET all to-do items
router.get("/", (req, res) => {
  res.json(todoList);
});

// GET a single to-do item
router.get("/:id", (req, res) => {
  const todoItem = todoList.find((item) => item.id === parseInt(req.params.id));
  if (!todoItem) {
    return res.status(404).json({ message: "To-do item not found" });
  }
  res.json(todoItem);
});

// POST a new to-do item
router.post("/", (req, res) => {
  const newTodoItem = {
    id: todoList.length + 1,
    task: req.body.task,
    done: false,
  };
  todoList.push(newTodoItem);
  res.status(201).json({ message: `To-do item ${newTodoItem.id} created` });
});

// PUT (update) a to-do item
router.put("/:id", (req, res) => {
  const todoItem = todoList.find((item) => item.id === parseInt(req.params.id));
  if (!todoItem) {
    return res.status(404).json({ message: "To-do item not found" });
  } else {
    todoItem.task = req.body.task;
    res.status(200).json({ message: `To-do item ${todoItem.id} updated` });
  }
});

// DELETE a to-do item
router.delete("/:param", (req, res) => {
  const param = req.params.param;
  const index = isNaN(param)
    ? todoList.findIndex((item) => item.task === param)
    : todoList.findIndex((item) => item.id === parseInt(param));

  if (index === -1) {
    res.status(404).json({ message: `To-do item ${param} not found` });
  } else {
    const deletedItem = todoList.splice(index, 1)[0];
    res.status(200).json({ message: `To-do item ${deletedItem.task} deleted` });
  }
});

module.exports = router;
