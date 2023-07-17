const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {

    try {
      console.log(req.header('authorization'),"auth");

        let token = req.header('authorization').split(' ')[1];
        token = token.replaceAll('"', '');
        console.log("Token:", token);
      
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken,"decodedToken");
        req.body.userId = decodedToken.userId;
        console.log(req.body.userId);

        next();

      } catch (err) {
        res.send({
          success: false,
          message: err.message
        });
    }
}