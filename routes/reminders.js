require("dotenv").config();
const express = require("express");
const router = express.Router();
const UsersModel = require("../models/users");
const RemindersModel = require("../models/reminders");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("../middleware/middleware");
const auth = require("../middleware/auth");

router.use(cors());
router.use(bodyParser.json());

router.get("/create", auth, async (req, res) => {
  try {
    const { tanggal_awal, tanggal_akhir, gambar, lokasi, catatan } = req.body;
    const user_id = req.user.id;

    const reminder = await RemindersModel.create({
      user_id,
      tanggal_awal,
      tanggal_akhir,
      gambar,
      lokasi,
      catatan,
    });

    res.status(200).json({
      status: 200,
      message: "Data reminder berhasil diinput",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      error: "Data gagal diinput",
    });
  }
});

module.exports = router;
