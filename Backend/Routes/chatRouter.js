import express from 'express';
import userAuth from '../Middleware/userAuth.js';
import chatControllers from '../Controllers/chatControllers.js';
const router = express.Router();

router.post('/', userAuth, chatControllers.accessChat);
router.get('/', userAuth, chatControllers.fetchChats);

export default router;