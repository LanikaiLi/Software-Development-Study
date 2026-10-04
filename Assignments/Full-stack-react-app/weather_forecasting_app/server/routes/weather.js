import express from 'express';

const router = express.Router();

router.get('/weather', async (req, res) => {
  const city = req.query.city;

  // 1. 没有输入城市
  if (!city) {
    return res.status(400).json({ error: 'Please enter a city name!' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 2. 找不到这个城市
    if (response.status === 404) {
      return res.status(404).json({ error: `City "${city}" not found. Please check the spelling.` });
    }

    // 3. OpenWeather 的其他错误
    if (!response.ok) {
      return res.status(502).json({ error: 'Weather service is not available. Please try again later.' });
    }

    res.json(data);
  } catch (err) {
    // 4. 连不上 OpenWeather（比如断网）
    res.status(500).json({ error: 'Could not reach the weather service. Please try again later.' });
  }
});

router.get('/forecast', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Please enter a city name.' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 404) {
      return res.status(404).json({ error: `City "${city}" not found. Please check the spelling.` });
    }

    if (!response.ok) {
      return res.status(502).json({ error: 'Weather service is not available. Please try again later.' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Could not reach the weather service. Please try again later.' });
  }
});

export default router;