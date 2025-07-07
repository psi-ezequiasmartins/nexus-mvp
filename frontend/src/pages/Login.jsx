/**
 * frontend/src/pages/Login.jsx
 * Tela de login simplificada usando AuthContext
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch {
      setErro('E-mail ou senha inválidos.');
    }
  }

  if (loading) return <p>Carregando…</p>;
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div style={{ padding: 20, maxWidth: 320, margin: '0 auto' }}>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
