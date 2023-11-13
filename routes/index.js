const express = require("express");
const route = express.Router();

const userRoute = require("./user.routes");
const todoRoute = require("./todo.routes");
const { authMiddleware, isAdmin } = require("../middleware/auth.middlewares")
route.get("/", (req, res) => {
  res.json({
    message: "selamat datang di server todo sequelize",
  });
});

route.use("/users", authMiddleware, isAdmin, userRoute);
route.use("/todos", authMiddleware, todoRoute);
route.use("/auth", require("./auth.routes"));
module.exports = route;
