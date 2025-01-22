const jwt = require("jsonwebtoken");

const validtoken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.mysecret);
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(403).json({ error: "Invalid token. Access denied." });
  }
};

module.exports = validtoken;
