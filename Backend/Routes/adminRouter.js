import express from 'express';
const router = express.Router();
import adminControllers from '../Controllers/adminControllers.js';
import adminAuth from '../Middleware/adminAuth.js';


router.post('/adminLogin', adminControllers.login);

router.get('/adminHome',adminAuth);

router.get('/users', adminAuth, adminControllers.getUsers);

router.get('/totalUsers', adminAuth, adminControllers.totalUsers);

router.get('/totalPremium', adminAuth, adminControllers.totalPremium);

router.get('/totalUserProfiles', adminAuth, adminControllers.totalUserProfiles);

router.get('/totalGender', adminAuth, adminControllers.totalGender);

router.get('/ageOfUsers', adminAuth, adminControllers.ageOfUsers);

router.post('/userBlock', adminAuth, adminControllers.userBlock);



export default router;