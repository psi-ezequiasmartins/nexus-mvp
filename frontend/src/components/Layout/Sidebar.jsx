/**
 * Sidebar.jsx
 */

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