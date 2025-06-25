/**
 * Login.jsx
 */

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