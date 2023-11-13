const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_KEY;

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "token required",
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  try {
    const payload = jwt.verify(token, key);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};
const isAdmin = (req, res, next) => {
  const { id_level } = req.payload;
  if (id_level !== 1) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  next();
};
module.exports = { authMiddleware, isAdmin };
