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

/**
 * Middleware factory that restricts a route to employees with one of the allowed permissions
 * @param {...string} allowedPermissions - Permissions allowed to access the route, checked against req.employee.permission
 * @returns {Function} Express middleware (req, res, next) that calls next() if req.employee's permission is allowed, otherwise sends a 401 (not logged in) or 403 (unauthorized) error
 */

// Rest parameter: collects any number of arguments into one array, so
// authorize("admin", "write") is called with plain roles instead of an array.
function authorize(...allowedPermissions) {
  // Express middleware must have the (req, res, next) signature.
  // authorize() itself takes permissions, not a request, so it can't be middleware directly.
  // Instead it returns a new function with that exact signature, which Express calls per-request.
  return (req, res, next) => {
    if (!req.employee) {
      return res.status(401).json({message: "not logged in"})
    }
    const { permission } = req.employee;
    if (allowedPermissions.includes(permission)) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized user!" })
    }

  }
}

module.exports = { authenticate, authorize };