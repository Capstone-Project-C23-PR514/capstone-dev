require('dotenv').config()

const express = require("express")
const router = express.Router()
const UsersModel = require("../models/users")
const ReportsModel = require("../models/reports")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('../middleware/middleware')
const auth = require('../middleware/auth')

router.use(cors())
router.use(bodyParser.json())

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id

    // Mengambil data report berdasarkan user_id
    const reports = await ReportsModel.findAll({
      where: { user_id: userId }
    })

    const nama_lengkap = req.user.nama_lengkap

    res.status(200).json({
      data: `Welcome to Dashboard, ${nama_lengkap}`,
      reports: reports
    })
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data report' })
  }
});

router.post("/register", async (req, res) => {
  const { nama_lengkap, email, password } = req.body

  // Validasi input kosong
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({
      error: "Mohon lengkapi semua field"
    })
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10)

    const users = await UsersModel.create({
      nama_lengkap,
      email,
      password: encryptedPassword,
    });
    res.status(200).json({
      status: 200,
      registered: users,
      metadata: "Register berhasil",
    });
  } catch (error) {
    res.status(400).json({
      error: "Register gagal",
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // Validasi input kosong
  if (!email || !password) {
    return res.status(400).json({
      error: "Mohon lengkapi semua field"
    })
  }

  try {
    const { user, isPasswordValid } = await middleware(email, password)

    if (!user || !isPasswordValid) {
      return res.status(401).json({ error: 'Email atau password salah' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' })

    res.status(200).json({
      status: 200,
      users: user,
      metadata: "Login berhasil",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memverifikasi pengguna' })
  }
});

module.exports = router
