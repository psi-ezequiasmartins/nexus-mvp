Perfeito. Vamos expandir o **Dashboard Nexus** com os seguintes componentes básicos:

---

### ✅ Estrutura de layout:

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   └── Dashboard/
│       └── OverviewCards.jsx
├── pages/
│   └── Dashboard.jsx
```

---

### ✅ `src/components/Layout/Sidebar.jsx`

```jsx
import { Home, MessageSquare } from 'react-feather';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div style={{
      width: 220,
      backgroundColor: '#201F1F',
      color: '#fff',
      height: '100vh',
      padding: '20px 10px'
    }}>
      <h3 style={{ color: '#C8C7C2' }}>nexus</h3>
      <nav>
        <Link to="/dashboard" style={linkStyle}><Home size={16} /> Dashboard</Link>
        <Link to="/tickets" style={linkStyle}><MessageSquare size={16} /> Tickets</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 0',
  color: '#C8C7C2',
  textDecoration: 'none'
};
```

---

### ✅ `src/components/Layout/Header.jsx`

```jsx
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      height: 60,
      background: '#fff',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
    }}>
      <span style={{ fontWeight: 600 }}>Painel Administrativo</span>
      <div>
        <span style={{ marginRight: 20 }}>{user.email}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
```

---

### ✅ `src/components/Dashboard/OverviewCards.jsx`

```jsx
export default function OverviewCards() {
  const data = [
    { title: 'Tickets Abertos', value: 12 },
    { title: 'Pendentes', value: 5 },
    { title: 'Encerrados', value: 18 }
  ];

  return (
    <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
      {data.map((item, i) => (
        <div key={i} style={{
          flex: 1,
          background: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ margin: 0 }}>{item.title}</h4>
          <strong style={{ fontSize: 24 }}>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
```

---

### ✅ Atualizar `src/pages/Dashboard.jsx`

```jsx
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import OverviewCards from '../components/Dashboard/OverviewCards';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, background: '#F5F5F5', minHeight: '100vh' }}>
        <Header />
        <div style={{ padding: 20 }}>
          <OverviewCards />
        </div>
      </div>
    </div>
  );
}
```

---

### ✅ Resultado:

* Dashboard protegido com layout split (`Sidebar + Header + Conteúdo`)
* Cards informativos
* Base para página de **Tickets**

---

👉 Posso prosseguir agora com a página `/tickets`, com listagem de tickets (mock) e opção de 
abrir detalhes/mensagens via modal? Deseja estilo mais minimalista ou algo mais colorido (ex: 
status com badge)?
