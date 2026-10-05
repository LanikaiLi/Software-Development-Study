import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function FavoritesList({ favorites, onRemove, onSelect }) {
  const { token } = useAuth();

  // 没登录：显示提示，而不是把整个区块藏起来（你设计时的决定）
  if (!token) {
    return (
      <section className="favorites">
        <h2>My Favorites</h2>
        <p className="favorites-locked">Log in or sign up to use this feature.</p>
        <Link to="/login" className="login-link">Log in</Link>
      </section>
    );
  }

  return (
    <section className="favorites">
      <h2>My Favorites</h2>

      {favorites.length === 0 && <p className="favorites-empty">No favorites yet.</p>}

      <ul className="favorites-list">
        {
            favorites.map((fav) => (
                <li key={fav._id} className="favorite-item">
                    <button type="button" className="favorite-city" onClick={() => onSelect(fav.city)}>
                        ★ {fav.city}
                    </button>
                    <button type="button" className="favorite-remove" aria-label={`Remove ${fav.city}`} onClick={() => onRemove(fav._id)}>
                        X
                    </button>

                </li>
            ))
        }
      </ul>
    </section>
  );
}

export default FavoritesList;