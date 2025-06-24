/**
 * ticketController.js
 */

const { connect } = require('../config/db');

async function criarTicket(req, res) {
  const { assunto, prioridade } = req.body;
  const usuarioId = req.user.id;

  try {
    const conn = await connect();
    const sql = 'INSERT INTO tickets (assunto, prioridade, usuario_id) VALUES (?, ?, ?)';
    await conn.execute(sql, [assunto, prioridade || 'media', usuarioId]);
    res.status(201).json({ mensagem: 'Ticket criado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao criar ticket' });
  }
}

async function listarTickets(req, res) {
  const usuarioId = req.user.id;
  const tipo = req.user.tipo;

  try {
    const conn = await connect();
    const sql = tipo === 'admin'
      ? 'SELECT * FROM tickets ORDER BY created_at DESC'
      : 'SELECT * FROM tickets WHERE usuario_id = ? ORDER BY created_at DESC';

    const [rows] = tipo === 'admin'
      ? await conn.execute(sql)
      : await conn.execute(sql, [usuarioId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao listar tickets' });
  }
}

module.exports = { criarTicket, listarTickets };