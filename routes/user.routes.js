const express = require("express");
const route = express.Router();
const { getAllData, getDataByID, updateData, binData } = require("../controllers/user.controllers");
const { authMiddleware, isAdmin } = require("../middleware/auth.middlewares");

route.get('/', authMiddleware, isAdmin, getAllData)
route.get('/:id', getDataByID)
route.delete('/:id',authMiddleware, isAdmin, binData)
route.put('/:id', authMiddleware, isAdmin, updateData)

module.exports = route;