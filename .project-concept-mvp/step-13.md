Perfeito. Abaixo segue o `Tickets.jsx` atualizado com **resposta rápida no modal** — mantendo o 
estilo minimalista:

---

### ✅ `src/pages/Tickets.jsx` (com resposta)

```jsx
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Tickets() {
  const [selected, setSelected] = useState(null);
  const [resposta, setResposta] = useState('');

  const tickets = [
    { id: 1023, assunto: 'Erro ao acessar painel', autor: 'João Silva', status: 'Pendente', 
mensagens: ['Tentei acessar o sistema e deu erro.'] },
    { id: 1024, assunto: 'Dúvida sobre cobrança', autor: 'Maria Lima', status: 'Aberto', 
mensagens: ['Recebi uma cobrança indevida.'] },
    { id: 1025, assunto: 'Sistema fora do ar', autor: 'Carlos Souza', status: 'Encerrado', 
mensagens: ['Está resolvido, obrigado.'] }
  ];

  const badgeColor = (status) => ({
    'Aberto': '#5cb85c',
    'Pendente': '#f0ad4e',
    'Encerrado': '#777'
  }[status] || '#999');

  const handleResponder = () => {
    if (!resposta.trim()) return alert('Digite uma resposta.');
    // Aqui você faria POST da resposta para a API.
    alert(`Resposta enviada: ${resposta}`);
    setResposta('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tickets</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assunto</th>
            <th>Autor</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{t.id}</td>
              <td>{t.assunto}</td>
              <td>{t.autor}</td>
              <td>
                <span style={{
                  background: badgeColor(t.status),
                  color: '#fff',
                  padding: '2px 10px',
                  borderRadius: 12,
                  fontSize: 12
                }}>
                  {t.status}
                </span>
              </td>
              <td>
                <button onClick={() => setSelected(t)}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <Modal isOpen={!!selected} onRequestClose={() => { setSelected(null); setResposta(''); }} 
style={modalStyle}>
          <h3>Ticket #{selected.id}</h3>
          <p><strong>Assunto:</strong> {selected.assunto}</p>
          <p><strong>Autor:</strong> {selected.autor}</p>
          <hr />
          <h4>Mensagens:</h4>
          <ul>
            {selected.mensagens.map((m, i) => <li key={i}>{m}</li>)}
          </ul>

          <textarea
            rows={3}
            placeholder="Digite uma resposta..."
            value={resposta}
            onChange={e => setResposta(e.target.value)}
            style={{ width: '100%', marginTop: 10 }}
          />
          <button onClick={handleResponder} style={{ marginTop: 10 }}>Responder</button>
          <button onClick={() => { setSelected(null); setResposta(''); }} style={{ marginTop: 10, marginLeft: 10 }}>Fechar</button>
        </Modal>
      )}
    </div>
  );
}

const modalStyle = {
  content: {
    top: '50%', left: '50%', right: 'auto', bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: 20, width: 450
  }
};
```

---

✅ Pronto para acoplar o envio real via API (`POST /tickets/:id/responder`)
Deseja agora que avancemos com a **página de criação de novo ticket** (`/novo-ticket`) ou integrar 
os dados via backend real?
