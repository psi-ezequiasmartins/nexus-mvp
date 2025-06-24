Perfeito, Ezequias. Vamos iniciar a **Etapa 4** com a estrutura base do **frontend React**, já com:

* **Firebase Auth** para login/autenticação.
* **Axios** configurado para chamadas à API.
* **Dashboard** protegido para usuários autenticados.
* Design limpo com **React-Bootstrap** e **Ant Design Icons**, conforme padrões anteriores.

A seguir, vou te entregar a estrutura de pastas e os principais arquivos. Confirma antes se deseja esse padrão:

```
/frontend
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   ├── index.js
│   └── firebase.js
├── .env
├── package.json
└── vite.config.js
```

Deseja usar **Vite** para build rápido ou manter com **Create React App**?

Assim que confirmar, já te entrego os arquivos iniciais prontos para rodar.

Perfeito.

### ✅ Diferença rápida:

* **Create React App (CRA)**: usa `npx create-react-app` — mais robusto, mas **mais lento** no build/dev. Configurações escondidas (webpack, babel).
* **Vite**: usa `npm create vite@latest` — mais **moderno e rápido**, usa ESModules nativos e Hot Module Reload mais eficiente. Exige familiaridade com configuração explícita (vite.config.js).

Como prefere **CRA**, vamos usar:

```bash
npx create-react-app nexus-frontend
cd nexus-frontend
```

Em seguida, irei te entregar os arquivos modificados:

* `firebase.js` com integração do Firebase Auth
* `AuthContext.jsx` com controle de sessão
* `axios.js` com baseURL
* `App.jsx`, `Login.jsx`, `Dashboard.jsx` e rotas protegidas

Posso prosseguir com essa estrutura inicial?
