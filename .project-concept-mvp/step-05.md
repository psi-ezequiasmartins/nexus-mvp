Perfeito. Iniciando agora a **🛠️ Etapa 3 – Criação do Backend API REST Nativo (Node.js + Express + MySQL + JWT + Firebase)** do projeto **Nexus**.

---

## 🔧 ETAPA 3 – BACKEND API REST (NEXUS)

### 🎯 Objetivo:

Criar um backend completo e modular com:

* Conexão com MySQL (usando `mysql2/promise`)
* Autenticação com JWT + validação com Firebase Auth
* Upload de arquivos em Firebase Storage
* Endpoints RESTful para: login, usuários, tickets, mensagens, anexos

---

### ✅ 1. ESTRUTURA DE PASTAS

```
/backend
├── config/
│   ├── db.js
│   └── firebase.js
├── controllers/
│   ├── authController.js
│   ├── ticketController.js
│   ├── messageController.js
│   ├── fileController.js
├── middlewares/
│   ├── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── ticketRoutes.js
│   ├── messageRoutes.js
│   ├── fileRoutes.js
├── utils/
│   └── jwt.js
├── uploads/ (cache opcional)
├── .env
├── server.js
```

---

### ✅ 2. BIBLIOTECAS UTILIZADAS

```bash
npm install express mysql2 cors dotenv jsonwebtoken firebase-admin multer
```

---

### ✅ 3. INÍCIO DO `server.js`

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const messageRoutes = require('./routes/messageRoutes');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
```

---

### ✅ 4. `config/db.js` (MySQL)

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

async function connect() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });
}

module.exports = { connect };
```

---

### ✅ 5. `config/firebase.js` (Firebase Admin SDK)

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});

module.exports = admin;
```

> 🔐 Inclua `firebaseServiceAccountKey.json` no `.gitignore`

---

### ✅ 6. `.env` (exemplo)

```dotenv
PORT=3001
DB_HOST=localhost
DB_USER=nexus
DB_PASSWORD=~@#$121247EzNXS
DB_NAME=nexus

JWT_SECRET=segredoJWTlocal
FIREBASE_BUCKET=nexus-app.appspot.com
```

---

📦 Etapa 3 continua com os arquivos:

* `authMiddleware.js` → valida JWT com Firebase
* `authController.js` → login/registro
* `ticketController.js`, `messageController.js`
* Upload de arquivos em Firebase Storage

🔜 Posso seguir agora com os **middlewares e controllers**, iniciando pelo `authMiddleware` e `authController`?
