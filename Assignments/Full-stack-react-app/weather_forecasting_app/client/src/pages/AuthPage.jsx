import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' 或 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      // 1. 如果是注册模式，先注册
      if (mode === 'register') {
        const registerRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const registerData = await registerRes.json();
        if (!registerRes.ok) throw new Error(registerData.error);
      }

      // 2. 登录（注册成功后也会走到这里，所以注册完自动登录）
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // 3. 存门禁卡，跳回首页
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  // 切换登录 / 注册时，顺便清空错误信息
  function switchMode(newMode) {
    setMode(newMode);
    setError('');
  }

  return (
    <main className="auth-page">
      <Link to="/" className="back-link">← Back to home</Link>

      <section className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'tab active' : 'tab'}
            onClick={() => switchMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'tab active' : 'tab'}
            onClick={() => switchMode('register')}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className="demo-account">Demo account: demo@test.com / demo1234</p>
      </section>
    </main>
  );
}

export default AuthPage;