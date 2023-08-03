import express from 'express';
const router = express.Router();
import adminControllers from '../Controllers/adminControllers.js';
import adminAuth from '../Middleware/adminAuth.js';


router.post('/adminLogin', adminControllers.login);

router.post('/adminHome',adminAuth);

router.post('/users', adminAuth);

export default router;