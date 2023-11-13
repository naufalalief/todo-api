const { User, Todo } = require("../models");

const sendErrorResponse = (res, message, error) => {
  res.status(500).json({
    message,
    error: error.message,
  });
};

module.exports = {
  getAllData: async (req, res) => {
    try {
      const data = await User.findAll({
        where: {
          id_level: 2,
        },
      });
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

  getDataByID: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findOne({
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
      const { name, username, email, password } = req.body;
      if (!name || !username || !email || !password) {
        return res.status(400).json({
          message: "all field must be filled",
        });
      }
      const [updateCount, [updatedUser]] = await User.update(
        {
          name,
          username,
          email,
          password,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      if (updateCount === 0) {
        return res.status(404).json({
          message: "update data failed, user not found",
        });
      }
      res.status(200).json({
        message: "update data success",
        data: updatedUser,
      });
    } catch (error) {
      sendErrorResponse(res, "update data failed", error);
    }
  },

  binData: async (req, res) => {
    try {
      const { id } = req.params;
      const userDeletedCount = await User.destroy({
        where: {
          id,
        },
      });
      const todoDeletedCount = await Todo.destroy({
        where: {
          id_user: id,
        },
      });
      if (userDeletedCount === 0) {
        return res.status(404).json({
          message: "delete data failed, user not found",
        });
      }
      res.status(200).json({
        message: `Sucessfully delete user with id ${id} and ${todoDeletedCount} associated todo`
      });
    } catch (error) {
      sendErrorResponse(res, "delete data failed", error);
    }
  },
};
