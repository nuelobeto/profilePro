const jwt = require("jsonwebtoken");
const { checkRecordExists } = require("../utils/sqlFunctions");

const requiresAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await checkRecordExists("users", "userId", decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    delete req.user.password;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token verification failed" });
  }
};

module.exports = { requiresAuth };
