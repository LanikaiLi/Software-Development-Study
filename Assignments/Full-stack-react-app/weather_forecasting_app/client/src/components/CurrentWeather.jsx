import { useState } from 'react';
import { useUnit } from '../context/UnitContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './CurrentWeather.css';

function CurrentWeather({ data, isFavorite, onFavorite }) {
  const { formatTemp } = useUnit();
  const { token } = useAuth();
  const [showLoginHint, setShowLoginHint] = useState(false);

  function handleFavoriteClick() {
    if (!token) {
      setShowLoginHint(true); // 没登录：显示提示
      return;
    }
    onFavorite(); // 登录了：通知 HomePage 去收藏
  }

  return (
    <section className="current-weather">
      <h2 className="city-name">{data.name}</h2>
      <p className="temperature">{formatTemp(data.main.temp)}</p>
      <p className="description">{data.weather[0].description}</p>

      <button
        type="button"
        className={isFavorite ? 'favorite-button saved' : 'favorite-button'}
        onClick={handleFavoriteClick}
        disabled={isFavorite}
      >
        {isFavorite ? '★ Saved' : '☆ Save'}
      </button>

      {showLoginHint && !token && (
        <p className="login-hint">Log in or sign up to use this feature.</p>
      )}

      <div className="weather-details">
        <p className="detail">Humidity: {data.main.humidity}%</p>
        <p className="detail">Wind: {data.wind.speed} m/s</p>
      </div>
    </section>
  );
}

export default CurrentWeather;