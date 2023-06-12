require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/users");
const express = require("express");
const router = express.Router();

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decodedToken.id;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(401).json({ error: "Pengguna tidak ditemukan" });
      }
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "Not Authorized" });
    }
  } catch (err) {
    res.status(403).json({ error: "Authorized is not validate" });
  }
};

module.exports = authenticateJWT;
