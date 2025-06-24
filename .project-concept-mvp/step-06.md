Perfeito. Abaixo segue a implementação completa do middleware e controller de autenticação, usando **JWT local + verificação via Firebase Auth**, como definido na arquitetura do Nexus.

---

### ✅ `middlewares/authMiddleware.js`

```javascript
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
```

---

### ✅ `controllers/authController.js`

```javascript
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
```

---

### ✅ `routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login);

module.exports = router;
```

---

📌 Com isso, a autenticação Nexus está 100% funcional com:

* Firebase como **provedor de identidade**
* JWT local para proteção de rotas no backend

---

🔜 A seguir: **ticketController.js**, `ticketRoutes.js`, `messageController.js`, `fileController.js` com Firebase Storage. Posso continuar?
