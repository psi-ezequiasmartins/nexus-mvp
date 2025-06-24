/**
 * authController.js
 */

const jwt = require('jsonwebtoken');
const { connect } = require('../config/db');
const admin = require('../config/firebase');
require('dotenv').config();

// Gera um token JWT local
function gerarToken(user) {
  return jwt.sign({
    id: user.id,
    uid: user.uid_firebase,
    email: user.email,
    nome: user.nome,
    tipo: user.tipo
  }, process.env.JWT_SECRET, { expiresIn: '2h' });
}

async function login(req, res) {
  const { firebaseToken } = req.body;

  if (!firebaseToken) return res.status(400).json({ mensagem: 'Token Firebase ausente' });

  try {
    // Verifica autenticidade do token Firebase
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const uid = decoded.uid;
    const email = decoded.email;
    const nome = decoded.name || 'Usuário';

    // Verifica se o usuário já existe no banco
    const conn = await connect();
    const [rows] = await conn.execute('SELECT * FROM usuarios WHERE uid_firebase = ?', [uid]);

    let usuario;

    if (rows.length === 0) {
      // Cria usuário automaticamente no banco se não existir
      const [result] = await conn.execute(
        'INSERT INTO usuarios (uid_firebase, nome, email, tipo) VALUES (?, ?, ?, ?)',
        [uid, nome, email, 'cliente']
      );
      usuario = {
        id: result.insertId,
        uid_firebase: uid,
        nome,
        email,
        tipo: 'cliente'
      };
    } else {
      usuario = rows[0];
    }

    const token = gerarToken(usuario);
    res.json({ token });
  } catch (err) {
    console.error('[LOGIN ERRO]', err);
    res.status(401).json({ mensagem: 'Token Firebase inválido' });
  }
}

module.exports = { login };