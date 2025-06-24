/**
 * messageRoutes.js
 */

const express = require('express');
const router = express.Router();
const { enviarMensagem, listarMensagens } = require('../controllers/messageController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, enviarMensagem);
router.get('/:ticketId', authenticate, listarMensagens);

module.exports = router;