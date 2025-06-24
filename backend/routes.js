const express = require('express');
const router = express.Router();
const { login, listAtendimentos, createAtendimento } = require('./controllers');

router.post('/login', login);
router.get('/atendimentos', listAtendimentos);
router.post('/atendimentos', createAtendimento);

module.exports = router;
