const jwt = require('jsonwebtoken');
require ("dotenv").config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const isAdmin =  decodedToken.isAdmin;
    res.locals.userId = userId;
    res.locals.isAdmin = isAdmin;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
   }catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};