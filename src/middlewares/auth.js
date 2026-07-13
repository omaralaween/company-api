const jwt = require("jsonwebtoken");

/**
 * Middleware that checks for a valid JWT in the Authorization header before letting the request through
 * @param {Object} req - Express request object, expects an "Authorization: Bearer <token>" header
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function, called if the token is valid
 * @returns {void} - Sends a 401 error message if the token is missing or invalid, otherwise calls next()
 */

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticate;