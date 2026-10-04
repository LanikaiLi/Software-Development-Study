import { Link } from 'react-router';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Weather App
      </Link>

      <div className="header-actions">
        <Link to="/login" className="login-link">
          登录 / 注册
        </Link>
      </div>
    </header>
  );
}

export default Header;