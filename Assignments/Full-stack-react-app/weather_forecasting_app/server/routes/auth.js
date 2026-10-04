import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB, getDB } from '../db.js';
import { ObjectId } from 'mongodb';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    // 1. 从 req.body 读取 email 和 password
    const email = req.body.email;
    const password = req.body.password;
  
    // 2. 用 findOne 检查这个 email 有没有注册过
    //    如果已经有了 → 返回 409 和 { error: 'Email already registered' }
    const user = await getDB().collection('users').findOne({ email: email });
    if (user) {
      return res.status(409).json({ error: 'Email already registered' });
    }
  
    // 3. 用 bcrypt 加密密码
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = {email: email, password_hash: password_hash};
  
  
    // 4. 用 insertOne 把 { email, password_hash } 存进 users
    await getDB().collection('users').insertOne(newUser);
  
    // 5. 返回 201 和 { message: 'User registered successfully' }
    res.status(201).json({ message: 'User registered successfully' });
  });
  
  router.post('/login', async (req, res) => {
    // 1. 从 req.body 读取 email 和 password
    const email = req.body.email;
    const password = req.body.password;
  
    // 2. 用 findOne 找这个 email 的用户
    //    没找到 → 返回 401 和 { error: 'Invalid email or password' }
    const user = await getDB().collection('users').findOne({email: email});
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

  router.get('/me', requireAuth, async (req, res) => {
    // 1. 用 findOne 找用户
    //    条件：{ _id: new ObjectId(req.userId) }
    const user = await getDB().collection('users').findOne({_id: new ObjectId(req.userId)});
  
    // 2. 返回 200 和 { email: user.email }
    res.status(200).json({ email: user.email });
  });

export default router;