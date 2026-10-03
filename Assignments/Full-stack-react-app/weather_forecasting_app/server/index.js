import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log('Key loaded:', Boolean(process.env.OPENWEATHER_API_KEY));