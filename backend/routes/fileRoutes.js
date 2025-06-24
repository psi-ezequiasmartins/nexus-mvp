/**
 * fileRoutes.js
 */

const express = require('express');
const router = express.Router();
const { uploadArquivo, upload } = require('../controllers/fileController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/upload', authenticate, upload.single('arquivo'), uploadArquivo);

module.exports = router;