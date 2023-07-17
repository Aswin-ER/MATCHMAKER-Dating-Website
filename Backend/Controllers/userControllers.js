const userModel = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    signup: async (req, res) => {

        const { name, email, password } = req.body;
    
        try {
          
          const existingUser = await userModel.findOne({ email });
          if (existingUser) {
            return res.send({ err: 'User already exists' });
          }
    
          // Generate salt and hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
    
          // Create the new user with the hashed password
          const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
          });
    
          console.log(newUser.name);
          // Handle the success response
          res.send({ message: 'User registered successfully' });

        } catch (error) {
          console.log(error);
          // Handle the error response
          res.status(500).send({ error: 'Internal server error' });
        }

    },

     login : async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await userModel.findOne({ email });

        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
    
          if (passwordMatch) {
            let token ;
            token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: "1h" } );
            
            res.send({ success: true, token: token});
          } else {
            res.send({ passErr: 'Invalid password' });
          }
        } else {
          res.send({ emailErr: 'User not found' });
        }
      } catch (error) {
        // Handle any potential errors
        res.status(500).send({ err: 'Internal Server Error' });
      }
    },

    getUser: async (req, res) => {
        
      console.log("working....", req.body.userId);

      try {
          const user = await userModel.findById({ _id: req.body.userId });
          console.log(user);
          res.send({
              success: true,
              message: "user fetched success",
              data: user
          })
      } catch (err) {
          res.send({
              success: false,
              message: err.message
          })
      }
  },
  

}

