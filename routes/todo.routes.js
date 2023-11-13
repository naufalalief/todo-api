const express = require("express");
const route = express.Router();

const {
  getAllData,
  updateData,
  binData,
  createData,
  getDataById,
  getAllTodo,
} = require("../controllers/todo.controllers");
const { isAdmin } = require("../middleware/auth.middlewares");
route.get("/alltodos", isAdmin, getAllTodo);
route.get("/", getAllData);
route.get("/:id", getDataById);
route.put("/:id", updateData);
route.delete("/:id", binData);
route.post("/", createData);

module.exports = route;
