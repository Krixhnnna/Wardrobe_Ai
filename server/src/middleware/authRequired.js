const jwt = require("jsonwebtoken");

module.exports = function authRequired(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const secret = process.env.JWT_SECRET || "fallback_secret_for_local_testing_12345";
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.userId };
    next();
  } catch (e) {
    return res.status(401).json({ error: "Not authenticated" });
  }
};