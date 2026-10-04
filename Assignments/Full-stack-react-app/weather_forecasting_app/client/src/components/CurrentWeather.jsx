import { useUnit } from '../context/UnitContext.jsx';

function CurrentWeather({ data }) {
  // 1. 从 useUnit() 取出 formatTemp
  const { formatTemp } = useUnit();

  return (
    <section className="current-weather">
      <h2 className="city-name">{data.name}</h2>
      <p className="temperature">{formatTemp(data.main.temp)}</p>
      <p className="description">{data.weather[0].description}</p>

      <div className="weather-details">
        <p className="detail">Humidity: {data.main.humidity}%</p>
        <p className="detail">Wind: {data.wind.speed} m/s</p>
      </div>
    </section>
  );
}

export default CurrentWeather;