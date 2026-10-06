import path from 'path';
import express from 'express';
import 'dotenv/config';
import { connectDB, getDB } from './db.js';
import weatherRoutes from './routes/weather.js';
import authRoutes from './routes/auth.js';
import favoritesRoutes from './routes/favorites.js';
//import { MongoClient, ObjectId } from 'mongodb'; // MongoClient：连接数据库。ObjectId：把网址里的文字 id 转成 MongoDB 的 id 类型，才能用 _id 找到数据

const app = express(); // middleware: runs on every request. It turns the JSON text in the request body into a JS object and puts it in req.body. Without it, req.body is undefined

app.use(express.json()) // to parse JSON bodies in requests
const PORT = process.env.PORT || 3000;


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', weatherRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/favorites', favoritesRoutes);

// 提供前端打包好的文件（上线时用）
const clientDist = path.join(import.meta.dirname, '../client/dist');
app.use(express.static(clientDist));

// 其他所有网址，都返回 index.html，交给 React Router 处理
app.use((req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

