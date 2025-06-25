/**
 * NovoTicket.jsx
 */

import { useState } from 'react';
import api from '../services/axios';
import { useNavigate } from 'react-router-dom';

export default function NovoTicket() {
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assunto || !mensagem) return alert('Preencha todos os campos.');

    try {
      const payload = { assunto, mensagem };
      await api.post('/tickets/novo', payload);
      alert('Ticket criado com sucesso!');
      navigate('/tickets');
    } catch (err) {
      alert('Erro ao criar ticket.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Novo Ticket</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Assunto"
          value={assunto}
          onChange={e => setAssunto(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <textarea
          placeholder="Mensagem inicial"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          required
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0'
};