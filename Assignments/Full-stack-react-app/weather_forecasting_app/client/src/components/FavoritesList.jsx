import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function FavoritesList({ favorites }) {
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
        {/* 用 favorites.map 显示每个收藏：
            <li key={fav._id} className="favorite-item">★ {fav.city}</li> */
          favorites.map((fav) => (
            <li key={fav._id} className="favorite-item">★ {fav.city}</li>
          ))
        }
      </ul>
    </section>
  );
}

export default FavoritesList;