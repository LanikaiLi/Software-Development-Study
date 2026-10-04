import { useUnit } from '../context/UnitContext.jsx';

function Forecast({ days }) {
  // 1. 从 useUnit() 取出 formatTemp
  const { formatTemp } = useUnit();

  return (
    <section className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {/* 2. 用 days.map((day) => ( ... )) 显示每一天。
               每一天是一个 <div key={day.dt} className="forecast-card">，里面放 3 个 <p>：
               - 星期几：className="forecast-day"
               - 天气描述：className="forecast-desc"，内容是 day.weather[0].description
               - 温度：className="forecast-temp"，内容是 formatTemp(day.main.temp) */
            days.map((day) => (
                <div key={day.dt} className = "forecast-card"> 
                <p className = "forecast-day">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className = "forecast-desc">{day.weather[0].description}</p>
                <p className = "forecast-temp">{formatTemp(day.main.temp)}</p>
                </div>
            ))
        }
      </div>
    </section>
  );
}

export default Forecast;