const jwt = require("jsonwebtoken");
const { checkRecordExists } = require("../utils/sqlFunctions");

const requiresAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Not authorized, no token" });
        return;
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await checkRecordExists("users", "userId", decoded.userId);
      delete req.user.password;

      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not authorized, no token" });
    }
  }
};

module.exports = { requiresAuth };
