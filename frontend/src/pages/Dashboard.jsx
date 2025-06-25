/**
 * Dashboard.jsx
 */

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