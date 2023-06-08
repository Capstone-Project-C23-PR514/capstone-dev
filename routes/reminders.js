require("dotenv").config();
const express = require("express");
const router = express.Router();
const RemindersModel = require("../models/reminders");
const UsersModel = require("../models/users");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

router.use(cors());
router.use(bodyParser.json());

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Buat instance Google Cloud Storage
const storageClient = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: "lippo-capstone.json", // Ganti dengan path yang benar ke file kredensial Anda
});
const bucket = storageClient.bucket("road-crack-model"); // Ganti dengan nama bucket Anda

router.get("/", auth, async (req, res) => {
  try {
    const reminders = await RemindersModel.findAll();

    res.status(200).json({
      reminders: reminders,
    });
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan",
    });
  }
});

router.post("/create", auth, upload.single("gambar"), async (req, res) => {
  try {
    const { tanggal_awal, tanggal_akhir, lokasi, catatan } = req.body;
    const user_id = req.user.id;
    const gambar = req.file; // Mengambil informasi file gambar yang diunggah

    // Menentukan nama file di Google Cloud Storage
    const namaFile = Date.now() + "-" + gambar.originalname;

    // Mengunggah file ke Google Cloud Storage
    const file = bucket.file(namaFile);
    const stream = file.createWriteStream({
      metadata: {
        contentType: gambar.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error("Error saat mengunggah file:", error);
      res.status(500).json({
        error: "Data gagal diinput",
      });
    });

    stream.on("finish", async () => {
      try {
        // Membuat data reminder dengan informasi gambar dari Google Cloud Storage
        const reminder = await RemindersModel.create({
          user_id,
          tanggal_awal,
          tanggal_akhir,
          gambar: `https://storage.googleapis.com/${bucket.name}/${namaFile}`,
          lokasi,
          catatan,
        });

        res.status(200).json({
          status: 200,
          message: "Data reminder berhasil diinput",
          data: reminder,
        });
      } catch (error) {
        console.error("Error saat membuat data reminder:", error);
        res.status(500).json({
          error: "Data gagal diinput",
        });
      }
    });

    stream.end(gambar.buffer);
  } catch (error) {
    console.error("Error saat mengolah data:", error);
    res.status(500).json({
      error: "Terjadi kesalahan",
    });
  }
});

module.exports = router;
