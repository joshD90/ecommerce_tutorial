require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) return res.status(401).json("You are not authenticated");
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(user);
    if (err) return res.status(403).json("Token is not valid");
    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user, "requser in authorization");
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("You're are not allowed to do this");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user, "verify token and admin");
    if (req.user.admin) {
      next();
    } else {
      res.status(403).json("You need admin privileges for this");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
