Perfeito. Abaixo está a implementação da tela `/perfil` com:

* Exibição de nome, e-mail e UID
* Botão para redefinir senha (via Firebase Auth)

---

### ✅ `src/pages/Perfil.jsx`

```jsx
import { useAuth } from '../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function Perfil() {
  const { user } = useAuth();

  const redefinirSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert('E-mail de redefinição de senha enviado.');
    } catch (err) {
      alert('Erro ao enviar redefinição de senha.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Perfil do Usuário</h2>
      <div style={{ marginTop: 20 }}>
        <p><strong>Nome:</strong> {user.displayName || '(sem nome)'}</p>
        <p><strong>E-mail:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
        <button onClick={redefinirSenha}>Redefinir Senha</button>
      </div>
    </div>
  );
}
```

---

### ✅ Rota protegida no `App.jsx`

```jsx
import Perfil from './pages/Perfil';
// ...
<Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
```

---

### ✅ Link opcional no `Sidebar.jsx`

```jsx
<Link to="/perfil" style={linkStyle}><User size={16} /> Perfil</Link>
```

> Lembre de importar:
> `import { Home, MessageSquare, Plus, User } from 'react-feather';`

---

✅ Pronto. A tela `/perfil` exibe os dados do usuário logado e envia um e-mail de redefinição 
de senha ao clicar no botão.

Deseja agora que avancemos com o **formulário de registro de novos usuários** (cadastro via 
Firebase Auth) ou outra funcionalidade?

Perfeito. Abaixo está a implementação da tela `/registrar` com:

* Formulário de cadastro com **nome**, **e-mail** e **senha**
* Criação do usuário no **Firebase Auth**
* Salvamento opcional no banco de dados MySQL (`usuarios`)

---

### ✅ `src/pages/Registrar.jsx`

```jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(cred.user, { displayName: nome });

      // opcional: salvar no MySQL
      const token = await cred.user.getIdToken();
      await api.post('/usuarios/novo', { uid: cred.user.uid, nome, email }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Usuário registrado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao registrar: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegistro} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit">Cadastrar</button>
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

### ✅ Rota pública no `App.jsx`

```jsx
import Registrar from './pages/Registrar';
// ...
<Route path="/registrar" element={<Registrar />} />
```

---

### ✅ Backend (opcional): `POST /usuarios/novo`

#### `routes/usuarioRoutes.js`

```js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const usuarioController = require('../controllers/usuarioController');

router.post('/novo', auth, usuarioController.registrarUsuario);

module.exports = router;
```

#### `controllers/usuarioController.js`

```js
const db = require('../config/db');

exports.registrarUsuario = async (req, res) => {
  const { uid, nome, email } = req.body;

  try {
    await db.query(`
      INSERT INTO usuarios (uid, nome, email, criado_em)
      VALUES (?, ?, ?, NOW())
    `, [uid, nome, email]);

    res.status(201).json({ sucesso: true });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ erro: 'Erro interno ao salvar usuário.' });
  }
};
```

---

### ✅ Estrutura da tabela `usuarios` no MySQL:

```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid VARCHAR(64) UNIQUE,
  nome VARCHAR(100),
  email VARCHAR(150),
  criado_em DATETIME
);
```

---

✅ Pronto. A tela `/registrar` permite criar novos usuários autenticados no Firebase e armazená-los no banco MySQL.

Deseja agora permitir login via Google/Facebook ou manter apenas e-mail/senha por enquanto?

