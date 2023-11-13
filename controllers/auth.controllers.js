const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password required",
      });
    }
    const login = await User.findOne({
      where: {
        username,
      },
    });

    if (login){
      const compare = bcrypt.compareSync(password, login.password);
      const expired = "12h"
      if (compare) {
        const token = jwt.sign(
          {
            id: login.id,
            username: login.username,
            id_level: login.id_level,
          },
          JWT_KEY,
          {
            expiresIn: expired,
          }
        );
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 12);
        return res.status(200).json({
          message: "login success",
          id: login.id,
          username: login.username,
          id_level: login.id_level,
          token: token,
          expired: expirationDate,
        });
      } else {
        return res.status(404).json({
          message: "Login failed, user not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Login failed",
      });
    }
  },
  register:  async (req, res) => {
    let {name, username, email, password} = req.body
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "invalid email",
      });
    }
    const isExist = await User.findOne({
      where: {
        email,
      },
    });
    if (isExist) {
      return res.status(400).json({
        message: "email already exist",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    password = hash;
    const register = await User.create({
      name,
      username,
      email,
      password,
      id_level: 2,
    });
    res.status(200).json({
      message: "register success",
      data: register,
    });
  },
};
