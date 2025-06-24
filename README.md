````markdown
# 📡 Nexus | Plataforma de Atendimento Inteligente

Sistema completo de atendimento ao cliente, com autenticação segura via Firebase Auth, interface React e backend Node.js + MySQL. Permite abertura, listagem e resposta de tickets, com controle de sessão e histórico.

---

## 📁 Estrutura do Projeto

### Backend (`/nexus-mvp/backend`)
- Node.js + Express
- MySQL (porta padrão 3306)
- Firebase Admin SDK (JWT auth)
- API RESTful
- PM2-ready

### Frontend (`/nexus-mvp/frontend`)
- React (CRA)
- Firebase Auth: e-mail/senha, Google e Facebook
- Axios com interceptors (token JWT)
- Dashboard com layout responsivo
- React Modal, react-feather

---

## ✅ Funcionalidades

### 🔒 Autenticação
- Login por **e-mail/senha**, **Google** e **Facebook**
- Proteção de rotas com **JWT Firebase**
- Middleware para validação de token no backend

### 📝 Tickets
- Abertura de novo ticket com assunto e mensagem
- Listagem de tickets do usuário autenticado
- Resposta rápida via modal
- Histórico completo de mensagens

### 👤 Perfil do usuário
- Visualização de nome, e-mail e UID
- Redefinição de senha via Firebase

### 👥 Registro
- Criação de novos usuários
- Sincronização com banco MySQL (`usuarios`)

---

## ⚙️ Build & Deploy

### 🔐 Requisitos
- Node.js >= 18.x
- MySQL Server ativo
- Firebase Project (com Auth habilitado)
- Firebase Admin SDK (.json)
- AAPanel ou ambiente Linux com PM2/Nginx

### 🚀 Backend
```bash
cd backend
cp .env.example .env  # edite com DB/Firebase config
npm install
pm2 start server.js --name nexus-api
````

### 💻 Frontend

```bash
cd frontend
npm install
npm run build
```

> O conteúdo do build (`frontend/build/`) pode ser publicado em `/wwwroot/nexus-app/`

---

## 📦 Gerar pacote `.zip` para deploy

```bash
cd nexus-mvp
zip -r nexus-mvp.zip backend frontend
```

> O pacote inclui: código-fonte completo, frontend buildável e backend pronto para rodar com PM2

---

## 🔧 Checklist Final

* [x] Firebase Auth configurado (email/Google/Facebook)
* [x] JWT middleware em todas rotas protegidas
* [x] Axios com token via `interceptors`
* [x] Tabelas MySQL: `usuarios`, `tickets`, `mensagens`
* [x] Validação de formulário no frontend
* [x] Modal com mensagens e respostas em tempo real
* [x] Layout responsivo, minimalista e funcional
* [x] Pronto para produção

---

## 📂 Repositório

📦 Clone:

```bash
git clone https://github.com/psi-ezequiasmartins/nexus-mvp.git
```

---

## 👨‍💻 Desenvolvido por

```

---

**Ezequias Martins**
Full Stack Developer | [deliverybairro.com](https://deliverybairro.com)
[github.com/psi-ezequiasmartins](https://github.com/psi-ezequiasmartins)

🧠 **With technical support and scope generation via AI ChatGPT (OpenAI)**
[https://openai.com/chatgpt](https://openai.com/chatgpt)

