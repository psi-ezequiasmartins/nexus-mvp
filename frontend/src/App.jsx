/**
 * frontend/src/App.js
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, MessageSquare, Plus } from 'react-feather';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import Tickets from './pages/Tickets';
import NovoTicket from './pages/NovoTicket';

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
        <Route path="/tickets" element={<PrivateRoute><Tickets /></PrivateRoute>} />
        <Route path="/novo-ticket" element={<PrivateRoute><NovoTicket /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}