Perfeito. Iniciando agora a **📦 Etapa 2 – Modelagem e Estrutura do Banco de Dados (MySQL)** do projeto **Nexus**, com base na lógica extraída do Chatwoot.

---

## 🧱 ETAPA 2 – MODELAGEM DO BANCO DE DADOS

### 🎯 Objetivo:

Modelar um esquema **relacional e simplificado**, com base no uso prático do Chatwoot para:

* Tickets
* Conversas
* Usuários
* Mensagens
* Anexos
* Contatos (clientes)

---

### ✅ 1. DIAGRAMA DE ENTIDADES (simplificado)

```text
USUARIOS
  └──< TICKETS
          └──< MENSAGENS
          └──< ANEXOS
          └──< CONTATO
```

---

### ✅ 2. SCRIPT SQL COMPLETO (`nexus.sql`)

```sql
-- Tabela de usuários (operadores e clientes)
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid_firebase VARCHAR(128) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  tipo ENUM('admin', 'cliente') DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contatos (clientes vinculados aos tickets)
CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tickets
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assunto VARCHAR(200) NOT NULL,
  status ENUM('aberto', 'em_atendimento', 'resolvido') DEFAULT 'aberto',
  prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
  usuario_id INT NOT NULL,
  contato_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (contato_id) REFERENCES contatos(id) ON DELETE SET NULL
);

-- Tabela de mensagens dentro dos tickets
CREATE TABLE mensagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  remetente_id INT,
  conteudo TEXT,
  tipo ENUM('texto', 'arquivo') DEFAULT 'texto',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
  FOREIGN KEY (remetente_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabela de anexos (armazenados no Firebase Storage)
CREATE TABLE anexos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  url_arquivo TEXT NOT NULL,
  nome_arquivo VARCHAR(255),
  tipo_arquivo VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);
```

---

### 🧩 3. RESUMO DAS TABELAS

| Tabela      | Descrição                                  |
| ----------- | ------------------------------------------ |
| `usuarios`  | Operadores e clientes (auth via Firebase)  |
| `contatos`  | Dados do cliente externo do ticket         |
| `tickets`   | Chamados (assunto, status, prioridade)     |
| `mensagens` | Texto ou interações entre as partes        |
| `anexos`    | Arquivos (armazenados no Firebase Storage) |

---

### 📌 Campos importantes e padrões aplicados:

* `uid_firebase` como identificador de autenticação externo
* `created_at` automático em todas as tabelas
* `ON DELETE CASCADE` nas FK para manter integridade
* Enums de status e tipo simplificados para lógica direta

---

## ✅ ETAPA 2 CONCLUÍDA

📂 Banco de dados **MySQL** modelado, funcional e pronto para ser aplicado.
🔜 Próximo passo: **Etapa 3 – Implementação do Backend com Node.js + Express + JWT + Firebase**

Deseja que eu inicie agora a Etapa 3 com a criação do backend API REST nativo?
