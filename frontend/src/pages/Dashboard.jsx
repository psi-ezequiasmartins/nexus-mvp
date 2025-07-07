/**
 * Dashboard.jsx
 */

import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import OverviewCards from '../components/Dashboard/OverviewCards';
import FileUploader from '../components/Upload/FileUploader';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, background: '#F5F5F5', minHeight: '100vh' }}>
        <Header />
        <div style={{ padding: 20 }}>
          <h2>Bem-vindo, {user.email}</h2>
          <button onClick={logout}>Sair</button>
        </div>
        <div style={{ padding: 20 }}>
          <OverviewCards />
        </div>
        <div>
          <h2>Upload de Arquivo</h2>
          <FileUploader />
        </div>        
      </div>
    </div>
  );
}