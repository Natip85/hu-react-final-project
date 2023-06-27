// const jwt = require("jsonwebtoken");
// const config = require("../config/dev");

// module.exports = (req, res, next) => {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Access denied. Sign in again.");

//   try {
//     req.token = jwt.verify(token, config.jwt_token);
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(401).send("Access denied. Sign in again.");
//   }
// };



const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const User = require("../models/User");

module.exports = (req, res, next) => {
  // const token = req.header("x-auth-token");
  // if (!token) return res.status(401).send("Access denied. Sign in again.");

  try {
    // req.token = jwt.verify(token, config.jwt_token);
    // next();

    const token = req.header("x-auth-token");
    console.log("THIS IS MY LOG", token);
  if (!token) return res.status(401).json({status: 'fail'});

//  let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }
//     if (!token) {
//       return res.status(401).json({ 
//         status: 'Fail', 
//         message: 'You are not logged in! Please log in to continue.' 
//       });
//     }

    const decoded =  jwt.verify(token, config.jwt_token);
    req.user = decoded;
    // console.log(decoded._id);
    const currentUser =  User.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'Fail',
        message: 'The user belonging to this token no longer exists.'
      })
    }
    next();



  } catch (err) {
    console.log(err);
    res.status(401).send("Access denied. Sign in again.");
  }
};
