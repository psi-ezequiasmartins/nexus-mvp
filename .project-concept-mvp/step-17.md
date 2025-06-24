📘 README.md no GitHub

# Nexus — Plataforma de Atendimento Inteligente

Sistema completo de atendimento com login via Firebase Auth, gerenciamento de tickets e mensagens, dashboard em tempo real e integração segura entre frontend e backend.

---

## 📦 Tecnologias

### Frontend
- ReactJS (Create React App)
- React Router DOM
- Firebase Auth (e-mail/senha, Google, Facebook)
- Axios (com interceptor JWT)
- React Modal, React Feather Icons
- Ant Design Icons (opcional)

### Backend
- Node.js + Express
- MySQL (via `mysql2`)
- Firebase Admin SDK (validação de JWT)
- Autenticação com middleware `authMiddleware`
- API RESTful

---

## 🔐 Autenticação

- Firebase Auth com suporte a:
  - E-mail/senha
  - Google Login
  - Facebook Login
- Backend protegido com token JWT (Bearer)
- `authMiddleware` verifica e decodifica o token

---

## 🧩 Estrutura de Diretórios

### Frontend (CRA)

/src
├── components/ # Layouts, Cards, Sidebar
├── context/ # AuthContext
├── pages/ # Login, Dashboard, Tickets, Perfil, NovoTicket, Registrar
├── services/ # Axios config
└── firebase.js # Firebase config


### Backend (Express)

/src
├── controllers/ # ticketController.js, usuarioController.js
├── middleware/ # authMiddleware.js
├── routes/ # ticketRoutes.js, usuarioRoutes.js
├── config/ # db.js (MySQL)
└── firebaseAdmin.js # Firebase Admin init


---

📄 Documentação de entrega técnica

## 🧪 Funcionalidades Implementadas

### ✅ Autenticação
- Login com e-mail/senha
- Login com Google/Facebook
- Registro de novos usuários
- Redefinição de senha

### ✅ Dashboard
- Sidebar com navegação
- Cards com resumo de tickets
- Página de perfil

### ✅ Tickets
- Listagem dos tickets do usuário autenticado
- Criação de novo ticket
- Modal com mensagens reais
- Resposta ao ticket via modal

---

## ⚙️ Banco de Dados

### Tabela: `usuarios`

```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid VARCHAR(64) UNIQUE,
  nome VARCHAR(100),
  email VARCHAR(150),
  criado_em DATETIME
);
```

## Tabela: tickets

```sql
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  assunto VARCHAR(255),
  usuario_id VARCHAR(64),
  status VARCHAR(20),
  criado_em DATETIME
);
```

## Tabela: mensagens

```sql
CREATE TABLE mensagens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT,
  autor_id VARCHAR(64),
  conteudo TEXT,
  criado_em DATETIME,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);
```

🚀 Build e Deploy

Frontend
```bash
npm install
npm run build
```
➡️ Subir o conteúdo da pasta /build para o servidor ou hospedagem (ex: Vercel, Firebase Hosting, Nginx)

Backend

```bash
npm install
npm run start # ou pm2 start
```
➡️ Deploy via PM2 + Nginx ou diretamente com Node


✅ Checklist de build e deploy (Checklist Final)

 - Autenticação completa (email, Google, Facebook)
 - JWT validado via Firebase Admin
 - CRUD funcional de tickets e mensagens
 - Acesso filtrado por usuário autenticado
 - Dashboard com layout responsivo
 - Proteção de rotas frontend/backend
 - Estrutura de banco de dados implementada
 
 🧠 Próximas Versões (sugestões)
 Perfis de acesso (usuário vs agente/admin)

 - Upload de arquivos no ticket (via Firebase Storage)
 - Chat em tempo real (Firebase ou Socket.IO)
 - Painel administrativo de gestão de usuários
 
👨‍💻 Desenvolvido por
Ezequias Martins
Full Stack Developer | deliverybairro.com
github.com/psi-ezequiasmartins

🧠 Com suporte técnico e geração de escopo via IA ChatGPT (OpenAI)
https://openai.com/chatgpt

