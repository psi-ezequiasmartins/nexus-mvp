/**
 * fileController.js
 */

const admin = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

async function uploadArquivo(req, res) {
  if (!req.file) return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });

  const bucket = admin.storage().bucket();
  const filename = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(`tickets/${filename}`);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4()
      }
    }
  });

  stream.on('error', (err) => {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao fazer upload' });
  });

  stream.on('finish', async () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;
    res.json({ url: publicUrl });
  });

  stream.end(req.file.buffer);
}

module.exports = { uploadArquivo, upload };