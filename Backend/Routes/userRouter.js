import express from 'express';
import userControllers from '../Controllers/userControllers.js';
import userAuth from '../Middleware/userAuth.js';
import User from '../Model/user.js';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import Token from '../Model/token.js';
import sendEmail from '../Config/sendEmail.js';
import bcrypt from 'bcrypt';
import multerConfig from '../Config/multer.js'
import chatControllers from '../Controllers/chatControllers.js';
import messageControllers from '../Controllers/messageControllers.js';
const upload = multerConfig.array('image');
const router = express.Router();

// Login and signup
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

// HomePage
router.get('/', userAuth, userControllers.getUser);


//Login and Signup with Google Account
router.post('/google', (req, res) => {
    console.log(req.body);
    const token = req.body.credential;
    const decoded = jwt.decode(token);
    console.log(decoded, "token");
    const { name, email, picture, jti } = decoded;

    const newUser = new User({
        name,
        email,
        picture,
        jti,
        status: true,
    });

    newUser.save()
        .then(saved => {
            console.log("User saved", saved);
            res.status(200).json({ message: 'User saved successfully' });
        })
        .catch(err => {
            console.error('Error saving user:', err);
            res.status(500).json({ message: 'Failed to save user' });
        });
});

router.post('/google/login', async (req, res) => {
    console.log(req.body);
    const token = req.body.credential;
    const decoded = jwt.decode(token);
    console.log(decoded, "token");
    const { name, email, picture, jti } = decoded;
    try {
        const user = await User.findOne({email: email});

        if (!user) {
            res.send('User not found');
        } else {

          if(user.status === false){
            res.status(200).send({message:"User Blocked"})
          }

            let token;
            token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).send({success: true, token: token})
        }
    }catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
        }
});


//Forgot password reset using email
router.post("/password", async (req, res) => {
    try {

       // Find the user based on the userId
        const user = await User.findOne({ email: req.body.email });
        console.log(user,"user here");

        if (!user)
            return res.status(400).send("user with given email doesn't exist");
        
         // Find the token associated with the user
        let token = await Token.findOne({ userId: user._id });
        console.log(token,"token here");

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            console.log(token,"token here");
        }

        // url for the reset password
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

        //Nodemailer function will be called
        await sendEmail(user.email, "MATCHMAKER Password reset", link);

        res.status(200).send("password reset link sent to your email account");

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.get("/password-reset/:userId/:token", async (req, res) => {
    try {
      const { userId, token } = req.params;
  
      // Find the user based on the userId
      const user = await User.findById(userId);
      console.log(user, "user here with token");
  
      if (!user)
        return res.status(400).send("Invalid password reset link");
  
      // Find the token associated with the user
      const resetToken = await Token.findOne({ userId, token });
      console.log(resetToken, "here with token");
  
      if (!resetToken)
        return res.status(400).send("Invalid password reset link");
  
      // Send the response to the server
      res.json({ userId, token });
  
    } catch (error) {
      res.status(500).send("An error occurred");
      console.log(error);
    }
});

router.post("/password-reset", async (req, res) => {
    try {
      const { userId, token } = req.body;

      console.log(req.body,"first body");

      const password = req.body.newPassword;
      
      console.log(password,"passsssssssss");
  
      // Find the user based on the userId
      const user = await User.findById(userId);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await user.updateOne({password: hashedPassword});

      await user.save()

      console.log(user, "last step");
  
      if (!user)
        return res.status(400).send("Invalid user");
  
      // Find the token associated with the user
      const resetToken = await Token.findOne({ userId, token });
  
      if (!resetToken)
        return res.status(400).send("Invalid token");;
  
      // Delete the used token
      await resetToken.deleteOne({ userId: user._id, token: token });
  
      res.status(200).send("Password reset successful");
  
    } catch (error) {
      res.status(500).send("An error occurred");
      console.log(error);
    }

});


//User profile
router.get('/userProfile', userAuth,  userControllers.getUserProfile);
router.post('/userProfile', upload, userAuth, userControllers.userProfile);
router.get('/getAllUserProfile', userControllers.getAllUserProfile);

router.get('/verifyProfile',userAuth, userControllers.verifyProfile);

//Liked profile
router.post('/like', userAuth, userControllers.likedProfile);
router.get('/getLikedProfiles', userAuth, userControllers.getLikedProfile);
router.get('/getLikedUserProfiles', userAuth, userControllers.getLikedUserProfiles);

// Filtered users
router.post('/getFilteredUsers', userAuth, userControllers.getFilteredUsers);

// Matched Profiles 
router.get('/getMatchedUserProfiles', userAuth, userControllers.getMatchedUserProfiles);

//Chat
router.post('/getChatId', userAuth, chatControllers.accessChat);

router.post('/message', userAuth, messageControllers.sendMessage);

router.get('/message/:id', userAuth, messageControllers.allMessage);



export default router;
