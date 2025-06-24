Perfeito, Ezequias. A **Etapa 1 – Análise e Extração da Lógica do Chatwoot** começa agora.

---

## 🔍 ETAPA 1 – ANÁLISE DA LÓGICA BASE DO CHATWOOT

### 🎯 Objetivo:

Extrair a **estrutura funcional mínima** e a **lógica de operação essencial do usuário** no Chatwoot, **sem regras avançadas**, visando reconstrução no Nexus.

---

### ✅ 1. ENTIDADES PRINCIPAIS

| Entidade         | Função no sistema Chatwoot            | Papel no Nexus                |
| ---------------- | ------------------------------------- | ----------------------------- |
| **Usuário**      | Operador ou cliente autenticado       | Operador (admin) ou Cliente   |
| **Inbox**        | Canal de entrada (e-mail, site, etc.) | Fila ou canal de entrada      |
| **Contato**      | Pessoa atendida (com nome/email)      | Cliente que inicia ticket     |
| **Conversa**     | Conjunto de mensagens em um ticket    | Ticket em andamento           |
| **Mensagem**     | Interação entre cliente e operador    | Texto trocado no chat         |
| **Anexo**        | Imagem ou arquivo enviado             | Arquivo ou imagem no Firebase |
| **Rótulo (Tag)** | Agrupamento por tema                  | (opcional) categorização      |

---

### ✅ 2. FLUXO FUNCIONAL EXTRAÍDO

1. **Usuário entra (Login)**
2. Escolhe **Inbox (canal)** ou é redirecionado
3. Cria ou visualiza um **Ticket (Conversa)**
4. O ticket possui **mensagens (chat)** entre cliente e operador
5. Pode anexar **arquivos ou imagens**
6. Status do ticket: `aberto`, `em atendimento`, `resolvido`

---

### ✅ 3. RELAÇÕES ENTRE ENTIDADES

```text
Usuário ↔ Inbox ↔ Ticket (Conversa) ↔ Mensagens
                ↘ Cliente (Contato)
```

Simplificando:

```text
Usuário
  └── Tickets
        └── Mensagens
        └── Anexos
```

---

### ✅ 4. CAMPOS ESSENCIAIS POR ENTIDADE

#### 🧑 Usuário

* id, nome, email, senha (Firebase Auth)
* tipo: `admin` ou `cliente`

#### 📩 Ticket

* id, user\_id (dono), assunto, status, prioridade, created\_at

#### 💬 Mensagem

* id, ticket\_id, sender (user\_id), tipo (`texto` ou `arquivo`), conteúdo, data

#### 📎 Anexo

* id, ticket\_id, url, tipo (`imagem`, `pdf`, etc), nome\_arquivo

#### 📇 Cliente

* id, nome, email (opcional), telefone

---

### ✅ 5. STATUS DE TICKET

Usaremos os mesmos do Chatwoot, simplificados:

```sql
ENUM('aberto', 'em_atendimento', 'resolvido')
```

---

### ✅ 6. FUNCIONALIDADES CENTRAIS DO USUÁRIO

| Ação                 | Permitido para     |
| -------------------- | ------------------ |
| Login com Firebase   | Todos os usuários  |
| Criar ticket         | Cliente            |
| Responder ticket     | Cliente e Operador |
| Ver lista de tickets | Cliente e Operador |
| Encerrar ticket      | Operador           |
| Anexar imagem/pdf    | Cliente e Operador |

---

## ✅ ETAPA 1 CONCLUÍDA

🔎 Lógica principal do Chatwoot **completamente extraída**
📐 Pronta para ser aplicada ao nosso modelo **Node.js + MySQL + Firebase**

---

🔜 **Próxima etapa:** **Modelagem e Estrutura do Banco de Dados (Etapa 2)**
Posso iniciar?
