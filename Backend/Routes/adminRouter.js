import express from 'express';
const router = express.Router();
import adminControllers from '../Controllers/adminControllers.js';
import adminAuth from '../Middleware/adminAuth.js';


router.post('/adminLogin', adminControllers.login);

router.get('/adminHome',adminAuth);

router.get('/users', adminAuth, adminControllers.getUsers);

router.post('/userBlock', adminAuth, adminControllers.userBlock);

export default router;