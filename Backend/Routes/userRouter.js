const express = require('express');
const userController = require('../Controllers/userControllers');
const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userAuth, userController.getUser);

module.exports = router;