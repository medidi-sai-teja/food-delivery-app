const jwt = require("jsonwebtoken");
const User = require("../../models/User");

async function verifyToken(req, res, next) {
  const token = req.cookies.jwt;

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}


module.exports = { verifyToken };
