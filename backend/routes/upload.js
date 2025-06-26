/**
 * upload.js
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../firebase/admin');

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads/temp';

// Cria pasta se não existir
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configura o multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Rota de upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.body.userId || 'anon';

    if (!file) return res.status(400).json({ error: 'Arquivo não enviado.' });

    // Salvar metadados no Firestore
    await db.collection('uploads').add({
      userId,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Upload concluído', filename: file.filename });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
