module.exports = (req, res, next) => {
  const user = req.user || {}; // Assume `req.user` is set by your auth middleware
  req.auditcontext = {
    id: user.id ||"unknown",
    username: user.name|| "unknown",
    email: user.email || " unknown",
    role: user.role || "unknown",
  };
  next();
};
