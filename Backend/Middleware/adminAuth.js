import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    console.log(req.header('authorization'), "adminAuth");

    let token = req.header('authorization').split(' ')[1];
    token = token.replaceAll('"', '');
    console.log("adminToken:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken, "admindecodedToken");
    req.body.adminId = decodedToken.adminId;
    console.log(req.body.adminId,"adminId here");
    next();
    
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
};

export default adminAuth;
