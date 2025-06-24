/**
 * authMiddleware.js
 */

const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
require('dotenv').config();

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ mensagem: 'Token ausente ou inválido' });

  const token = authHeader.split(' ')[1];

  try {
    // Verifica JWT local
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o uid é válido no Firebase
    const firebaseUser = await admin.auth().getUser(decoded.uid);
    if (!firebaseUser) throw new Error('Usuário não encontrado no Firebase');

    // Injeta os dados do usuário no request
    req.user = {
      id: decoded.id,
      uid: decoded.uid,
      email: decoded.email,
      nome: decoded.nome,
      tipo: decoded.tipo
    };

    next();
  } catch (err) {
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
}

module.exports = authenticate;