/**
 * authController.js
 */

const { connect } = require('../config/db');
const admin = require('../config/firebase');
const { gerarToken } = require('../utils/jwt');
require('dotenv').config();

async function login(req, res) {
  const { firebaseToken } = req.body;

  if (!firebaseToken) return res.status(400).json({ mensagem: 'Token Firebase ausente' });

  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const uid = decoded.uid;
    const email = decoded.email;
    const nome = decoded.name || 'Usuário';

    const conn = await connect();
    const [rows] = await conn.execute('SELECT * FROM usuarios WHERE uid_firebase = ?', [uid]);

    let usuario;

    if (rows.length === 0) {
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

    const token = gerarToken({
      id: usuario.id,
      uid: usuario.uid_firebase,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo
    });

    res.json({ token });
  } catch (err) {
    console.error('[LOGIN ERRO]', err);
    res.status(401).json({ mensagem: 'Token Firebase inválido' });
  }
}

module.exports = { login };
