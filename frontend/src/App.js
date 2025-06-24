import React, { useState, useEffect } from 'react';

export default function App() {
  const [token, setToken] = useState('');
  const [atendimentos, setAtendimentos] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      alert('Login inválido');
    }
  };

  const carregarAtendimentos = async () => {
    const res = await fetch('/api/atendimentos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setAtendimentos(data);
  };

  useEffect(() => {
    if (token) carregarAtendimentos();
  }, [token]);

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-center">Nexus | Login</h1>
          <input
            type="email"
            className="w-full border p-2 mb-4"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border p-2 mb-4"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 w-full rounded"
            onClick={login}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Painel de Atendimentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {atendimentos.map((a, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="font-bold">{a.cliente}</h2>
            <p className="text-gray-600">{a.mensagem}</p>
            <p className="text-xs text-gray-400 mt-2">{a.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

