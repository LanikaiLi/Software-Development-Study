import { useReducer } from 'react';
import SearchBar from '../components/SearchBar.jsx';

// 天气请求的初始状态
const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  currentWeather: null,
  error: null,
};

// reducer：根据 action 的类型，决定状态怎么变
function weatherReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', currentWeather: action.currentWeather, error: null };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

function HomePage() {
  const [weather, dispatch] = useReducer(weatherReducer, initialState);

  async function searchCity(city) {
    dispatch({ type: 'FETCH_START' });

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      dispatch({ type: 'FETCH_SUCCESS', currentWeather: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message });
    }
  }

  return (
    <main className="home-page">
      <SearchBar onSearch={searchCity} />
      <p>Status: {weather.status}</p>
    </main>
  );
}

export default HomePage;