Perfeito! Abaixo está a estrutura inicial completa para o **frontend Nexus** usando **Create React App**, com:

* Firebase Auth funcionando
* AuthContext para controle de sessão
* Axios configurado
* Login, logout e dashboard com rota protegida

---

### ✅ `src/firebase.js`

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

### ✅ `src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }), []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

---

### ✅ `src/services/axios.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nexus-api.markagp.com.br',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
```

---

### ✅ `src/pages/Login.jsx`

```jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard');
    } catch (err) {
      alert('Login inválido');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
```

---

### ✅ `src/pages/Dashboard.jsx`

```jsx
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h2>Bem-vindo, {user.email}</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

### ✅ `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### ✅ `src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

---

Deseja agora que eu compacte e disponibilize essa estrutura inicial em `.zip` ou prefere que eu 
prossiga expandindo os componentes do dashboard (menu lateral, cards, chat/tickets, etc)?
