const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token " });

  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { hashId: decoded.hashId, intId: decoded.intId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
