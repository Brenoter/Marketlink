import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName);
        setMessage('Login bem-sucedido!');
        navigate('/inicio');
      } else {
        setMessage('Email ou senha incorretos');
      }
    } catch (error) {
      setMessage('Erro ao fazer login');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById('signup-name').value;
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: signupEmail, password: signupPassword }),
      });
  
      if (response.ok) {
        setMessage('Registro bem-sucedido!');
      } else {
        setMessage('E-mail ja cadastrado.');
      }
    } catch (error) {
      setMessage('Erro ao fazer registro');
    }
  };

  return (
    <div>
      <a href="/" className="brand-logo">
        <img src="/images/MarketLink - Logo.jpg" alt="Logo MarketLink" />
      </a>
      <div className="main-container">
        <div className="auth-section">
          <h2>Bem-vindo de volta!</h2>
          <p>Use seu e-mail e senha para entrar no Marketlink</p>
          <div className="input-form-container">
            <form onSubmit={handleLogin}>
              <input
                type="email"
                id="login-email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="login-password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div id="seller-option" className="password-reminder">
                <p>
                  Já é Vendedor? Clique <Link to="/login_vendedor"><strong>aqui</strong></Link>
                </p>
              </div>
              <div className="password-reminder">
                <p>
                  Esqueceu sua Senha? Clique <Link to="/recuperar_senha"><strong>aqui</strong></Link>
                </p
              ></div>
              <button type="submit">Entrar</button>
              <p>{message}</p>
            </form>
          </div>
        </div>
        <div className="registration-section">
          <h2 style={{ color: '#0cc0df' }}>Novo no MarketLink?</h2>
          <p>Faça o seu cadastro</p>
          <div className="input-form-container">
            <form onSubmit={handleRegister}>
              <input
                type="text"
                id="signup-name"
                placeholder="Nome"
                required
              />
              <input
                type="email"
                id="signup-email"
                placeholder="E-mail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="signup-password"
                placeholder="Senha"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <div className="password-reminder">
                <p>
                  Quer Vender? Clique <Link to="/cadastro_vendedor" style={{ color: 'black' }}><strong>aqui</strong></Link>
                </p
              ></div>
              <button type="submit">Cadastrar</button>
              <p>{message}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
