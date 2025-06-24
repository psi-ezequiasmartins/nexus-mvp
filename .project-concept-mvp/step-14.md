Perfeito. Vamos primeiro criar a **página `/novo-ticket`** com formulário minimalista, e depois 
conectaremos com o backend real.

---

### ✅ `src/pages/NovoTicket.jsx`

```jsx
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
```

---

### ✅ Adicione rota no `App.jsx`

```jsx
import NovoTicket from './pages/NovoTicket';
// ...
<Route path="/novo-ticket" element={<PrivateRoute><NovoTicket /></PrivateRoute>} />
```

---

### ✅ (Opcional) Link no Sidebar

No `Sidebar.jsx`, adicione:

```jsx
<Link to="/novo-ticket" style={linkStyle}><Plus size={16} /> Novo Ticket</Link>
```

Lembre de importar:

```js
import { Home, MessageSquare, Plus } from 'react-feather';
```

---

✅ **Próximo passo:** integrar com backend real:

* Rota `POST /tickets/novo`
* Retornar `id` do ticket criado
* Atualizar listagem `/tickets` via `GET`

Confirma que deseja agora o código da rota `POST /tickets/novo` no backend?

Perfeito. Abaixo está o código completo da rota `POST /tickets/novo` no backend **Node.js + 
Express + MySQL**, já adaptado ao seu projeto `nexus-mvp`.

---

### ✅ `routes/ticketRoutes.js`

```js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/novo', ticketController.criarTicket);

module.exports = router;
```

---

### ✅ `controllers/ticketController.js`

```js
const db = require('../config/db'); // conexão MySQL

exports.criarTicket = async (req, res) => {
  const { assunto, mensagem } = req.body;
  const userId = req.user?.uid || null; // opcional: extraído do token JWT

  if (!assunto || !mensagem) {
    return res.status(400).json({ erro: 'Assunto e mensagem são obrigatórios.' });
  }

  try {
    const [ticketResult] = await db.query(
      'INSERT INTO tickets (assunto, usuario_id, status, criado_em) VALUES (?, ?, ?, NOW())',
      [assunto, userId, 'Aberto']
    );

    const ticketId = ticketResult.insertId;

    await db.query(
      'INSERT INTO mensagens (ticket_id, autor_id, conteudo, criado_em) VALUES (?, ?, ?, NOW())',
      [ticketId, userId, mensagem]
    );

    res.status(201).json({ sucesso: true, ticketId });
  } catch (err) {
    console.error('Erro ao criar ticket:', err);
    res.status(500).json({ erro: 'Erro interno ao criar ticket.' });
  }
};
```

---

### ✅ Tabelas esperadas no MySQL:

```sql
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  assunto VARCHAR(255),
  usuario_id VARCHAR(64),
  status VARCHAR(20),
  criado_em DATETIME
);

CREATE TABLE mensagens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT,
  autor_id VARCHAR(64),
  conteudo TEXT,
  criado_em DATETIME,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);
```

---

🔐 Se quiser proteger com Firebase Auth + JWT, a `req.user.uid` deve ser preenchida por um 
`authMiddleware`.

Posso seguir com a **integração do GET /tickets** agora, para popular a listagem real?
Perfeito. Abaixo está a implementação completa da rota `GET /tickets`, que retorna todos os 
tickets com dados essenciais (id, assunto, autor, status, criado\_em).

---

### ✅ `routes/ticketRoutes.js` (com GET)

```js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/novo', ticketController.criarTicket);
router.get('/', ticketController.listarTickets); // <- novo

module.exports = router;
```

---

### ✅ `controllers/ticketController.js` (com listarTickets)

```js
const db = require('../config/db');

exports.listarTickets = async (req, res) => {
  try {
    const [tickets] = await db.query(`
      SELECT t.id, t.assunto, t.status, t.criado_em, u.nome AS autor
      FROM tickets t
      LEFT JOIN usuarios u ON u.uid = t.usuario_id
      ORDER BY t.criado_em DESC
    `);

    res.json(tickets);
  } catch (err) {
    console.error('Erro ao listar tickets:', err);
    res.status(500).json({ erro: 'Erro ao buscar tickets.' });
  }
};
```

---

### ✅ Exemplo de estrutura do retorno JSON:

```json
[
  {
    "id": 1024,
    "assunto": "Erro ao acessar painel",
    "status": "Pendente",
    "criado_em": "2025-06-24T13:30:00.000Z",
    "autor": "João Silva"
  }
]
```

---

### ✅ Integração no frontend (`Tickets.jsx`)

Substitua o array mock por chamada `useEffect + axios`:

```jsx
import { useEffect, useState } from 'react';
import api from '../services/axios';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/tickets');
        setTickets(res.data);
      } catch (err) {
        alert('Erro ao carregar tickets');
      }
    };
    fetchData();
  }, []);
```

---

✅ Agora a listagem está **conectada ao backend real**, sem dados mock.

Deseja que a próxima etapa seja exibir as **mensagens reais** de cada ticket no modal (`GET 
/tickets/:id/mensagens`)?

Perfeito. Abaixo está a próxima etapa com:

* Rota `GET /tickets/:id/mensagens` no backend
* Integração no modal do frontend para exibir mensagens reais

---

### ✅ Backend: `controllers/ticketController.js`

```js
exports.listarMensagens = async (req, res) => {
  const ticketId = req.params.id;

  try {
    const [mensagens] = await db.query(`
      SELECT m.id, m.conteudo, m.criado_em, u.nome AS autor
      FROM mensagens m
      LEFT JOIN usuarios u ON u.uid = m.autor_id
      WHERE m.ticket_id = ?
      ORDER BY m.criado_em ASC
    `, [ticketId]);

    res.json(mensagens);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
    res.status(500).json({ erro: 'Erro ao carregar mensagens do ticket.' });
  }
};
```

---

### ✅ Backend: `routes/ticketRoutes.js`

```js
router.get('/:id/mensagens', ticketController.listarMensagens);
```

---

### ✅ Frontend: `Tickets.jsx` (modal com mensagens reais)

Adicione:

```js
const [mensagens, setMensagens] = useState([]);

const abrirModal = async (ticket) => {
  try {
    const res = await api.get(`/tickets/${ticket.id}/mensagens`);
    setMensagens(res.data);
    setSelected(ticket);
  } catch (err) {
    alert('Erro ao carregar mensagens.');
  }
};
```

Substitua onde estava `onClick={() => setSelected(t)}` por:

```jsx
<button onClick={() => abrirModal(t)}>Ver</button>
```

E no modal:

```jsx
<h4>Mensagens:</h4>
<ul>
  {mensagens.map((m, i) => (
    <li key={i}>
      <strong>{m.autor}:</strong> {m.conteudo}
      <br />
      <small>{new Date(m.criado_em).toLocaleString()}</small>
    </li>
  ))}
</ul>
```

---

✅ Agora o modal exibe mensagens reais do banco.
Deseja que a próxima etapa seja **enviar novas mensagens ao ticket (POST 
/tickets/\:id/responder)** direto do modal?

Perfeito. A seguir implementamos a etapa de **envio de novas mensagens** ao ticket, via:

* Rota `POST /tickets/:id/responder` no backend
* Integração direta no modal do frontend (`Tickets.jsx`)

---

### ✅ Backend: `controllers/ticketController.js`

```js
exports.responderTicket = async (req, res) => {
  const ticketId = req.params.id;
  const { mensagem } = req.body;
  const autorId = req.user?.uid || null; // se autenticado com JWT

  if (!mensagem) {
    return res.status(400).json({ erro: 'Mensagem é obrigatória.' });
  }

  try {
    await db.query(`
      INSERT INTO mensagens (ticket_id, autor_id, conteudo, criado_em)
      VALUES (?, ?, ?, NOW())
    `, [ticketId, autorId, mensagem]);

    res.status(201).json({ sucesso: true });
  } catch (err) {
    console.error('Erro ao responder ticket:', err);
    res.status(500).json({ erro: 'Erro ao enviar resposta.' });
  }
};
```

---

### ✅ Backend: `routes/ticketRoutes.js`

```js
router.post('/:id/responder', ticketController.responderTicket);
```

---

### ✅ Frontend: `Tickets.jsx` (envio direto)

Atualize a função `handleResponder`:

```jsx
const handleResponder = async () => {
  if (!resposta.trim()) return alert('Digite uma resposta.');

  try {
    await api.post(`/tickets/${selected.id}/responder`, { mensagem: resposta });
    const res = await api.get(`/tickets/${selected.id}/mensagens`);
    setMensagens(res.data); // atualiza após resposta
    setResposta('');
  } catch (err) {
    alert('Erro ao enviar resposta.');
  }
};
```

---

✅ Agora o agente pode **responder tickets diretamente pelo modal**, com mensagens persistidas no
 banco e atualizadas automaticamente após o envio.

Deseja que a próxima etapa seja proteger essas rotas com **Firebase Auth + JWT (authMiddleware)**?

Perfeito. Vamos proteger o backend com **Firebase Auth + JWT**, usando um `authMiddleware` que valida o token enviado no header `Authorization`.

---

### ✅ 1. Instale o SDK Admin do Firebase (backend)

```bash
npm install firebase-admin
```

---

### ✅ 2. Configure o Firebase Admin SDK

Crie `firebaseAdmin.js` na raiz:

```js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // chave privada do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
```

> 🔐 Gere esse JSON no Firebase em:
> **Configurações do projeto > Contas de serviço > Gerar nova chave privada**

---

### ✅ 3. Crie o middleware `authMiddleware.js`

```js
const admin = require('../firebaseAdmin');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token ausente ou inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      nome: decoded.name || null
    };
    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
};
```

---

### ✅ 4. Aplique o middleware nas rotas protegidas

No `ticketRoutes.js`:

```js
const auth = require('../middleware/authMiddleware');

router.post('/novo', auth, ticketController.criarTicket);
router.get('/', auth, ticketController.listarTickets);
router.get('/:id/mensagens', auth, ticketController.listarMensagens);
router.post('/:id/responder', auth, ticketController.responderTicket);
```

---

### ✅ 5. Frontend: Enviar token no `axios.js`

No `src/services/axios.js`:

```js
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: 'https://nexus-api.markagp.com.br',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

✅ Agora **todas as rotas protegidas** requerem um token válido do Firebase Auth, garantindo que 
apenas usuários autenticados possam acessar ou alterar tickets.

Deseja agora listar **apenas os tickets do usuário autenticado** (`usuario_id = req.user.uid`) ou 
manter acesso global?

Excelente ponto. A **melhor prática recomendada** depende do perfil do usuário autenticado:

---

### ✅ **Para clientes comuns:**

* **Listar apenas seus próprios tickets** (`usuario_id = req.user.uid`)
* Evita exposição de dados de outros usuários
* Mantém privacidade e segurança

```sql
SELECT ... FROM tickets WHERE usuario_id = ?
```

---

### ✅ **Para agentes/suporte/admin:**

* **Listar todos os tickets**
* Precisa acessar qualquer ticket do sistema
* Exige controle por roles/permissões

```sql
SELECT ... FROM tickets
```

---

### 🎯 **Recomendação para o Nexus agora**:

Como o sistema ainda não tem controle de perfis/níveis (cliente vs agente):

> ✅ **Use `req.user.uid` por padrão**
> Posteriormente, adicione campo `tipo_usuario` e crie lógica condicional:

```js
if (req.user.role === 'admin') { listar tudo } else { filtrar por uid }
```

---

Posso agora atualizar a rota `GET /tickets` para listar **apenas os tickets do usuário 
autenticado**?

Perfeito. Abaixo está a versão atualizada da rota `GET /tickets`, filtrando **apenas os tickets vinculados ao `req.user.uid`** (usuário autenticado via Firebase Auth + JWT).

---

### ✅ `controllers/ticketController.js` (atualizado)

```js
exports.listarTickets = async (req, res) => {
  const uid = req.user?.uid;

  try {
    const [tickets] = await db.query(`
      SELECT t.id, t.assunto, t.status, t.criado_em, u.nome AS autor
      FROM tickets t
      LEFT JOIN usuarios u ON u.uid = t.usuario_id
      WHERE t.usuario_id = ?
      ORDER BY t.criado_em DESC
    `, [uid]);

    res.json(tickets);
  } catch (err) {
    console.error('Erro ao listar tickets:', err);
    res.status(500).json({ erro: 'Erro ao buscar tickets.' });
  }
};
```

---

✅ Agora o usuário autenticado verá **somente seus próprios tickets**.

🔒 Se no futuro você quiser adicionar **níveis de acesso** (ex: admin visualiza todos), será necessário:

* Adicionar campo `role` na tabela `usuarios`
* Buscar role no `authMiddleware` e anexar a `req.user.role`
* Condicionar a query SQL com `IF` baseado na role

Deseja que eu prepare esse controle de **permissões básicas por role** como próxima etapa?

Perfeito. Com as seguintes etapas já concluídas:

✅*  Login com Firebase Auth
✅*  Dashboard com cards e menu
✅*  Listagem de tickets reais por usuário autenticado
✅*  Modal com mensagens reais
✅*  Envio de novas mensagens
✅*  Proteção por token JWT (Firebase)

---

### 📦 **Próximo passo recomendado**:

**Página de perfil do usuário autenticado**, com:

* Exibição de nome, e-mail e UID
* Botão para redefinir senha (via Firebase)
* Opção futura de editar dados (nome, avatar, etc.)

---

### Deseja que eu implemente agora a tela `/perfil` com os dados do usuário logado e opção de 
redefinir senha?

