const jwt = require('jsonwebtoken');
const Student = require('../models/student');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Student.findById(decoded.id);
    
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send({ error: 'Admin access required' });
  }
};

// module.exports = { authMiddleware, isAdmin };

// const jwt = require('jsonwebtoken');
// const Student = require('../models/student');
// require('dotenv').config();

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Get the Authorization header
//     const authHeader = req.header('Authorization');
    
//     // Check if the Authorization header exists
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).send({ error: 'Authorization header missing or malformed' });
//     }

//     // Extract the token by removing 'Bearer '
//     const token = authHeader.replace('Bearer ', '');

//     // Verify the JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the student based on the decoded token's id
//     const user = await Student.findById(decoded.id);
    
//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Attach the user to the request object
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate' });
//   }
// };

// const isAdmin = (req, res, next) => {
//   // Check if the user is authenticated and has an admin role
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).send({ error: 'Admin access required' });
//   }
// };

// module.exports = { authMiddleware, isAdmin };
