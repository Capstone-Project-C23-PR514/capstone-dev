const express = require("express")
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('../middleware/auth')
const ReportsModel = require("../models/reports")

router.use(cors())
router.use(bodyParser.json())

// Rute untuk menerima data dari FastAPI dan menyimpan data di tabel reports
router.post('/upload', auth, async (req, res) => {
  try {
    const { lokasi, desc, akurasi, gambar } = req.body
    const user_id = req.user.id; // Ambil ID pengguna dari data autentikasi (middleware auth)

    // Simpan data ke dalam tabel reports menggunakan model Report
    const report = await ReportsModel.create({
      user_id,
      judul,
      gambar,
      lokasi,
      desc,
      akurasi
    })

    res.status(200).json({
      status: 200,
      message: 'Data berhasil diinput',
      data: report
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat menginput data' })
  }
})

module.exports = router
