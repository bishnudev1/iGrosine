const jwt = require('jsonwebtoken');

const extractAdminFromCookie = (req, res, next) => {
  // Extract the token from the cookie
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Missing token"
    });
  }

  try {
    // Verify the token and extract admin information
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.admin = decoded; // Attach admin information to the request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token"
    });
  }
};

module.exports = extractAdminFromCookie;
