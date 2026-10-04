import express from 'express';

const router = express.Router();

router.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    res.json(data);
  });
  
  router.get('/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
  
    const url_get_city_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response_get_city_forecast = await fetch(url_get_city_forecast);
    const data_get_city_forecast = await response_get_city_forecast.json();
  
    res.json(data_get_city_forecast);
  })

export default router;