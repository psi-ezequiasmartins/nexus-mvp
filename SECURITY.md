# 🔐 Política de Segurança – Projeto Nexus

Este documento define as práticas recomendadas de segurança, atualizações e diretrizes para relato de vulnerabilidades no sistema **Nexus | Plataforma de Atendimento Inteligente**.

---

## ✅ Boas Práticas Recomendadas

### 🔐 Autenticação
- Utilizar sempre **Firebase Auth** com provedores confiáveis (e-mail, Google, Facebook)
- Tokens JWT validados em **todas as rotas protegidas** no backend
- Senhas de usuários não são armazenadas no servidor (100% gerenciadas pelo Firebase)

### 🛡️ Banco de Dados
- Variáveis sensíveis (usuário, senha, host) devem estar no `.env` e **nunca versionadas**
- Acesso ao banco MySQL deve estar restrito à rede local ou VPN
- Backup periódico automatizado é recomendado

### 🔒 Permissões
- O frontend exibe apenas dados vinculados ao usuário autenticado (`uid`)
- O backend filtra todos os dados por `req.user.uid` por padrão
- Níveis de acesso (ex: admin) devem ser implementados com roles futuras

---

## 🔄 Atualizações

### 📦 Dependências
- Manter Node.js, NPM/Yarn e pacotes atualizados mensalmente
- Verificar alertas de segurança via `npm audit` ou `yarn audit`

### 🔁 Renovação de Certificado SSL
- Certificados gerados via Let's Encrypt/Cerbot renovam automaticamente a cada 90 dias
- Validar renovação com:
```bash
sudo certbot renew --dry-run
