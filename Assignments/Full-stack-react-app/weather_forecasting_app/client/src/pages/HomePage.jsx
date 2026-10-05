import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FavoritesList from '../components/FavoritesList.jsx';
import CurrentWeather from '../components/CurrentWeather.jsx';
import Forecast from '../components/Forecast.jsx';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  currentWeather: null,
  forecast: [],
  error: null,
};

function weatherReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return {
        status: 'success',
        currentWeather: action.currentWeather,
        forecast: action.forecast,
        error: null,
      };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

// 预报有 40 项（每 3 小时 1 项），只留每天中午 12 点的那一项，就是 5 天
function toDailyForecast(list) {
  return list.filter((item) => item.dt_txt.includes('12:00:00'));
}

function HomePage() {
  const [weather, dispatch] = useReducer(weatherReducer, initialState);
  const [favorites, setFavorites] = useState([]);
  const { token } = useAuth();

  // 登录状态一变，就重新加载收藏列表
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    async function fetchFavorites() {
      const res = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFavorites(data.favorites);
    }

    fetchFavorites();
  }, [token]);

  // 默认城市
  useEffect(() => {
    searchCity('Montreal');
  }, []);


  // 查天气：当前天气 + 预报
  async function searchCity(city) {
    dispatch({ type: 'FETCH_START' });

    try {
      const weatherRes = await fetch(`/api/weather?city=${city}`);
      const weatherData = await weatherRes.json();
      if (!weatherRes.ok) throw new Error(weatherData.error);

      const forecastRes = await fetch(`/api/forecast?city=${city}`);
      const forecastData = await forecastRes.json();
      if (!forecastRes.ok) throw new Error(forecastData.error);

      dispatch({
        type: 'FETCH_SUCCESS',
        currentWeather: weatherData,
        forecast: toDailyForecast(forecastData.list),
      });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message });
    }
  }

  // 新增收藏 ← 6.6b 新加
  async function addFavorite(city) {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ city }),
    });
    const data = await res.json();

    if (res.ok) {
      setFavorites([...favorites, data]);
    }
  }

  // 删除收藏 ← 6.6b 新加
  async function removeFavorite(id) {
    console.log('removeFavorite', id);

    const res = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();

    console.log('res.ok', res.ok);

    if (res.ok) {
        setFavorites(favorites.filter((fav) => fav._id !== id));
    }
  }

  // 当前城市有没有收藏过 ← 6.6b 新加
  const currentCity = weather.currentWeather?.name;
  const isFavorite = favorites.some((fav) => fav.city === currentCity);

  return (
    <main className="home-page">
      <SearchBar onSearch={searchCity} />

      <FavoritesList favorites={favorites} onRemove={removeFavorite} onSelect={searchCity} />

      {weather.status === 'loading' && <p className="status-message">Loading...</p>}

      {weather.status === 'error' && <p className="error-message">{weather.error}</p>}

      {weather.status === 'success' && (
        <>
          <CurrentWeather
            data={weather.currentWeather}
            isFavorite={isFavorite}
            onFavorite={() => addFavorite(currentCity)}
          />
          <Forecast days={weather.forecast} />
        </>
      )}
    </main>
  );
}

export default HomePage;