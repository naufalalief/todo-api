const express = require("express");
const route = express.Router();
const { getAllData, getDataByID, updateData, binData } = require("../controllers/user.controllers");

route.get('/', getAllData)
route.get('/:id', getDataByID)
route.delete('/:id', binData)
route.put('/:id', updateData)

module.exports = route;