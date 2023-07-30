import express from 'express';
const router = express.Router();
import adminControllers from '../Controllers/adminControllers.js';


router.post('/adminLogin', adminControllers.login);

export default router;