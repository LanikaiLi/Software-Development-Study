import { useReducer } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import CurrentWeather from '../components/CurrentWeather.jsx';
import Forecast from '../components/Forecast.jsx';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  currentWeather: null,
  forecast: [],          // ← 新加
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
        forecast: action.forecast,   // ← 新加
        error: null,
      };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

// ← 新加：预报有 40 项（每 3 小时 1 项），只留每天中午 12 点的那一项，就是 5 天
function toDailyForecast(list) {
  return list.filter((item) => item.dt_txt.includes('12:00:00'));
}

function HomePage() {
  const [weather, dispatch] = useReducer(weatherReducer, initialState);

  async function searchCity(city) {
    dispatch({ type: 'FETCH_START' });

    try {
      // 1. 当前天气
      const weatherRes = await fetch(`/api/weather?city=${city}`);
      const weatherData = await weatherRes.json();
      if (!weatherRes.ok) throw new Error(weatherData.error);

      // 2. 预报 ← 新加
      const forecastRes = await fetch(`/api/forecast?city=${city}`);
      const forecastData = await forecastRes.json();
      if (!forecastRes.ok) throw new Error(forecastData.error);

      dispatch({
        type: 'FETCH_SUCCESS',
        currentWeather: weatherData,
        forecast: toDailyForecast(forecastData.list),   // ← 新加
      });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message });
    }
  }

  return (
    <main className="home-page">
      <SearchBar onSearch={searchCity} />

      {weather.status === 'loading' && <p className="status-message">Loading...</p>}

      {weather.status === 'error' && <p className="error-message">{weather.error}</p>}

      {weather.status === 'success' && (
        <>
          <CurrentWeather data={weather.currentWeather} />
          <Forecast days={weather.forecast} />
        </>
      )}
    </main>
  );
}

export default HomePage;