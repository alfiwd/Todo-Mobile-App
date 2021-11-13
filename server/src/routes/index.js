const express = require("express");

const router = express.Router();

const { getTodosCategory, getTodosStatus, getTodo, addTodo, editTodo, deleteTodo } = require("../controllers/todo");

router.get("/todos/category/:category", getTodosCategory);
router.get("/todos/status/:status", getTodosStatus);
router.get("/todo/:id", getTodo);
router.post("/todo", addTodo);
router.put("/todo/:id", editTodo);
router.delete("/todo/:id", deleteTodo);

module.exports = router;
