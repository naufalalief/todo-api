const { Todo } = require("../models");

const sendErrorResponse = (res, message, error) => {
  res.status(500).json({
    message,
    error: error.message,
  });
};
module.exports = {
  getAllTodo: async (req, res) => {
    try {
      const data = await Todo.findAll();
      res.status(200).json({
        message: "get all data",
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "get all data failed",
        error: error.message,
      });
    }
  },
  getAllData: async (req, res) => {
    try {
      const { id, username } = req.payload;
      const data = await Todo.findAll({
        where: {
          id_user: id,
        },
      });
      res.status(200).json({
        message: "get all data by current user " + username,
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "get all data failed",
        error: error.message,
      });
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.findOne({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "get data by id",
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "get data by id failed",
        error: error.message,
      });
    }
  },
  updateData: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, isdone } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "all field must be filled",
        });
      }
      const data = await Todo.update(
        {
          name,
          isdone,
        },
        {
          where: {
            id,
          },
        }
      );
      if (data === 0) {
        return res.status(400).json({
          message: "update data failed, todo not found",
        });
      }
      res.status(200).json({
        message: "update data success",
      });
    } catch (error) {
      sendErrorResponse(res, "update data failed", error);
    }
  },
  binData: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.destroy({
        where: {
          id,
        },
      });
      if (data === 0) {
        return res.status(400).json({
          message: "delete data failed, todo not found",
        });
      }
      res.status(200).json({
        message: "delete data success",
      });
    } catch (error) {
      sendErrorResponse(res, "delete data failed", error);
    }
  },
  createData: async (req, res) => {
    try {
      const { name, isdone = false } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "all field must be filled",
        });
      }
      const id_user = req.payload.id;
      if (!id_user) {
        return res.status(400).json({
          message: "id user not found",
        });
      }
      const data = await Todo.create({
        name,
        isdone,
        id_user,
      });
      res.status(200).json({
        message: "create data success",
        data,
      });
    } catch (error) {
      sendErrorResponse(res, "create data failed", error);
    }
  },
};
