/**
 * messageController.js
 */

const { connect } = require('../config/db');

async function enviarMensagem(req, res) {
  const { ticketId, conteudo, tipo } = req.body;
  const remetenteId = req.user.id;

  try {
    const conn = await connect();
    await conn.execute(
      'INSERT INTO mensagens (ticket_id, remetente_id, conteudo, tipo) VALUES (?, ?, ?, ?)',
      [ticketId, remetenteId, conteudo, tipo || 'texto']
    );
    res.status(201).json({ mensagem: 'Mensagem enviada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao enviar mensagem' });
  }
}

async function listarMensagens(req, res) {
  const { ticketId } = req.params;

  try {
    const conn = await connect();
    const [rows] = await conn.execute(
      'SELECT * FROM mensagens WHERE ticket_id = ? ORDER BY created_at ASC',
      [ticketId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao listar mensagens' });
  }
}

module.exports = { enviarMensagem, listarMensagens };