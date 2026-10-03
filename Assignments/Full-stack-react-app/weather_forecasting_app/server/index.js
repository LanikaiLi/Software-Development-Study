import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  res.json(data);
});

// app.get('/api/forecast', async (req, res) => {
//   const city = req.query.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   const url_get_city_lat_lon = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   const response_get_city_lat_lon = await fetch(url_get_city_lat_lon);
//   const data_get_city_lat_lon = await response_get_city_lat_lon.json();
//   const lat = data_get_city_lat_lon.coord.lat;
//   const lon = data_get_city_lat_lon.coord.lon;

//   const url_get_city_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   const response_get_city_forecast = await fetch(url_get_city_forecast);
//   const data_get_city_forecast = await response_get_city_forecast.json();

//   res.json(data_get_city_forecast);
// })

app.get('/api/forecast', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const url_get_city_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response_get_city_forecast = await fetch(url_get_city_forecast);
  const data_get_city_forecast = await response_get_city_forecast.json();

  res.json(data_get_city_forecast);
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

