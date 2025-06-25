/**
 * Header.jsx
 */

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