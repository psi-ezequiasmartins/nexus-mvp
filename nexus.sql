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