import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

app.post('/api/auth/register', async (req, res) => {
  // 1. 从 req.body 读取 email 和 password
  const email = req.body.email;
  const password = req.body.password;

  // 2. 用 findOne 检查这个 email 有没有注册过
  //    如果已经有了 → 返回 409 和 { error: 'Email already registered' }
  const user = await db.collection('users').findOne({ email: email });
  if (user) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // 3. 用 bcrypt 加密密码
  const password_hash = await bcrypt.hash(password, 10);
  const newUser = {email: email, password_hash: password_hash};


  // 4. 用 insertOne 把 { email, password_hash } 存进 users
  await db.collection('users').insertOne(newUser);

  // 5. 返回 201 和 { message: 'User registered successfully' }
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', async (req, res) => {
  // 1. 从 req.body 读取 email 和 password
  const email = req.body.email;
  const password = req.body.password;

  // 2. 用 findOne 找这个 email 的用户
  //    没找到 → 返回 401 和 { error: 'Invalid email or password' }
  const user = await db.collection('users').findOne({email: email});
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // 3. 用 bcrypt.compare 核对密码
  //    不对 → 返回 401 和 { error: 'Invalid email or password' }
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // 4. 用 jwt.sign 发门禁卡
  //    放进门禁卡的内容：{ userId: user._id.toString() }
  //    有效期：{ expiresIn: '5d' }
  const token = jwt.sign({userId: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '5d'});

  // 5. 返回 200 和 { token: token }
  res.status(200).json({ token: token });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

