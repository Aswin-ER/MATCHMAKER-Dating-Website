const express = require('express');
const userController = require('../Controllers/userControllers');
const userAuth = require('../Middleware/userAuth');
const user = require('../Model/user');
const jwt = require('jsonwebtoken');

 const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userAuth, userController.getUser);

router.post('/google', (req, res)=> {
    console.log(req.body);
    const token = req.body.credential;
    const decoded = jwt.decode(token);
    console.log(decoded,"token");
    const { name, email, picture, jti } = decoded;

    const newUser = new user({
        name, email, picture, jti
    });
    newUser.save().then((saved)=>{
        console.log("User saved", saved);
        res.status(200).json({ message: 'User saved successfully' });
    }).catch((err)=> {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Failed to save user' });
    })
    

  })


module.exports = router;