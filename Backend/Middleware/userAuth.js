import jwt from 'jsonwebtoken';
import User from '../Model/user.js';

const userAuth = async (req, res, next) => {
  try {
    // console.log(req.header('authorization'), "userAuth");

    let token = req.header('authorization').split(' ')[1];
    token = token.replace(/"/g, '');
    // console.log("userToken:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken, "UserdecodedToken");
    req.body.userId = decodedToken.userId;
    // console.log(req.body.userId);

    await User.findById(req.body.userId).then((res)=> {
      if(res.status === false){
        throw new Error("jwt expired");
      }else{
        next();
      }
    })

  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
};

export default userAuth;
