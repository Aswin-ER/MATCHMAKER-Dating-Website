import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    console.log(req.header('authorization'), "userAuth");

    let token = req.header('authorization').split(' ')[1];
    token = token.replaceAll('"', '');
    // console.log("userToken:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken, "UserdecodedToken");
    req.body.userId = decodedToken.userId;
    console.log(req.body.userId);

    next();
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
};

export default userAuth;
