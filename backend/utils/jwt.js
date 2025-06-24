/**
 * jwt.js
 */

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'nexus-secret';

function gerarToken(payload, expiresIn = '6h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  gerarToken,
  verificarToken
};
