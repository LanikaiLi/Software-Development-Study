import { Link } from 'react-router';
import { useUnit } from '../context/UnitContext.jsx';

function Header() {
  const { unit, toggleUnit } = useUnit();  
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Weather App
      </Link>

      <div className="header-actions">
      <button type="button" className="unit-toggle" onClick={toggleUnit}>°{unit}</button>
        <Link to="/login" className="login-link">
          登录 / 注册
        </Link>
      </div>
    </header>
  );
}

export default Header;