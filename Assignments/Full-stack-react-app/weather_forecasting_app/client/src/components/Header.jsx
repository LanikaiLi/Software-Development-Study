import { Link } from 'react-router';
import { useUnit } from '../context/UnitContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const { unit, toggleUnit } = useUnit();  
  const { token, email, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Weather App
      </Link>

      <div className="header-actions">
      <button type="button" className="unit-toggle" onClick={toggleUnit}>°{unit}</button>
      {
        token ? (
            <>
            <span className="user-email">{email}</span>
            <button type="button" className="logout-button" onClick={logout}>
                Log out
            </button>
            </>
        ) : (
            <Link to="/login" className="login-link">
                Log in / Sign up
            </Link>
        )
      }
      </div>
    </header>
  );
}

export default Header;