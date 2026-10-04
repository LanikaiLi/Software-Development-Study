import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function AuthPage() {
  // 1. 用 useState 建 3 个 state，初始值都是 ''：
  //    email、password、error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' 或 'register'

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      // 2. 用上面学的 POST 写法，请求 '/api/auth/login'，结果存在 res 里
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // 3. const data = await res.json();
      const data = await res.json();

      // 4. 如果 !res.ok → throw new Error(data.error)
      if (!res.ok) {
        throw new Error(data.error);
      }

      // 5. 登录成功：login(data.token)
      login(data.token);
      // 6. 跳回首页：navigate('/')
      navigate('/');
    } catch (err) {
      // 7. setError(err.message)
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <Link to="/" className="back-link">← Back to home</Link>

      <section className="auth-card">
        <h2>Log in</h2>

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

          <button type="submit" className="submit-button">Log in</button>
        </form>

        <p className="demo-account">Demo account: demo@test.com / demo1234</p>
      </section>
    </main>
  );
}

export default AuthPage;