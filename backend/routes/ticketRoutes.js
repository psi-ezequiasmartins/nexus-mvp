/**
 * ticketRoutes.js
 */

const express = require('express');
const router = express.Router();
const { criarTicket, listarTickets } = require('../controllers/ticketController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, criarTicket);
router.get('/', authenticate, listarTickets);

module.exports = router;