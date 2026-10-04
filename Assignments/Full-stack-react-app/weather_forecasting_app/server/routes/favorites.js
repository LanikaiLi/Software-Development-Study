import express from 'express';
import { connectDB, getDB } from '../db.js';
import { ObjectId } from 'mongodb';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth); // 所有 API 都要先经过门卫。这样就不用在每个 API 里都写一次 requireAuth 

router.post('/', async (req, res) => {
    // 1. 从 req.body 读取 city
    const city = req.body.city;
    const userId = req.userId;
  
    // 2. 用 findOne 检查这个用户有没有收藏过这个城市
    //    条件：{ userId: req.userId, city: city }
    //    已经收藏过 → 返回 409 和 { error: 'City already in favorites' }
    const findCity = await getDB().collection('favorites').findOne({userId: userId, city: city});
    if (findCity) {
        return res.status(409).json({ error: 'City already in favorites' });
    }
  
    // 3. 建立新收藏：{ userId: req.userId, city: city, createdAt: new Date() }
    const newFavorite = {userId: userId, city: city, createdAt: new Date()};
  
    // 4. 用 insertOne 存进 favorites，把结果存在 result 里
    const result = await getDB().collection('favorites').insertOne(newFavorite);
  
    // 5. 返回 201 和 { ...newFavorite, _id: result.insertedId }
    res.status(201).json({ ...newFavorite, _id: result.insertedId });
  });

router.get('/', async (req, res) => {
    // 1. 用 find 找这个用户的所有收藏
    const userId = req.userId;

    const favorites = await getDB().collection('favorites').find({userId: userId}).toArray();
   
  
    // 2. 返回 200 和 { favorites: favorites }
    res.status(200).json({ favorites: favorites });
  });

router.delete('/:id', async (req, res) => {
    // 1. 从 req.params.id 读取要删除的收藏 id
    const id = req.params.id;
    const userId = req.userId;
  
    // 2. 用 deleteOne 删除
    //    条件：{ _id: new ObjectId(id), userId: req.userId }
    const result = await getDB().collection('favorites').deleteOne({_id: new ObjectId(id), userId: userId});
  
    // 3. 如果 result.deletedCount 是 0 → 返回 404 和 { error: 'Favorite not found' }
    if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Favorite not found' });
    }
    // 4. 返回 200 和 { message: 'Favorite deleted' }
    res.status(200).json({ message: 'Favorite deleted' });
  });

export default router;