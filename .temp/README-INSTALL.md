# Instruções de Instalação do MVP Nexus

## Backend
1. cd backend-nexus
2. npm install
3. cp ../.env.example .env
4. node app.js (ou pm2 start app.js)

## Frontend
1. cd frontend-nexus
2. Criar projeto React ou inserir App.jsx
3. npm start

## Banco de Dados
1. Executar `nexus.sql` no seu MySQL

## Produção
- Use PM2: `pm2 start app.js`
- Configure domínio + SSL no AAPanel

/nexus-mvp/
├── backend/                      # Backend Node.js com API REST
│   ├── index.js                 # Servidor Express + conexão MySQL
│   ├── .env.example             # Variáveis de ambiente da API
│   └── package.json             # Dependências do backend
│
├── frontend/                    # Frontend ReactJS
│   ├── public/
│   │   └── index.html           # HTML base do React
│   ├── src/
│   │   ├── App.jsx              # Componente principal
│   │   ├── main.jsx            # Ponto de entrada da aplicação React
│   │   └── services/api.js     # Axios configurado com base URL
│   ├── .env                    # Variáveis para build (VITE_API_URL)
│   └── package.json            # Dependências do frontend
│
├── sql/
│   └── nexus.sql                # Script SQL com estrutura + dados de exemplo
│
├── deploy/                     # Scripts shell automatizados
│   ├── deploy-nexus.sh         # Instalação completa do projeto
│   ├── post-reboot.sh          # Pós-reboot: reinício de serviços
│   └── finalize-setup.sh       # Validação e restart de serviços
│
├── .gitignore                  # Arquivos ignorados (caso usado Git)
└── README.md                   # Instruções técnicas (opcional, gerado na entrega)

