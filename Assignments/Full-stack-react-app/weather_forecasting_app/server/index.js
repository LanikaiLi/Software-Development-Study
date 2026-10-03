import express from 'express';
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb'; // MongoClient：连接数据库。ObjectId：把网址里的文字 id 转成 MongoDB 的 id 类型，才能用 _id 找到数据

const app = express(); // middleware: runs on every request. It turns the JSON text in the request body into a JS object and puts it in req.body. Without it, req.body is undefined

app.use(express.json()) // to parse JSON bodies in requests
const PORT = 3000;

let db

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  db = client.db('weather_forecasting')
  console.log('Connected to MongoDB')
}

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

app.get('/api/forecast', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const url_get_city_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response_get_city_forecast = await fetch(url_get_city_forecast);
  const data_get_city_forecast = await response_get_city_forecast.json();

  res.json(data_get_city_forecast);
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

