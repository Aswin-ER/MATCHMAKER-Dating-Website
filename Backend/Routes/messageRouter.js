import express from 'express';
import userAuth from '../Middleware/userAuth.js';
import messageControllers from '../Controllers/messageControllers.js';
const router = express.Router();

router.post('/', userAuth, messageControllers.sendMessage);
router.get('/:chatId', userAuth, messageControllers.allMessage);

export default router;