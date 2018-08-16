module.exports = function(req, res, next) {
  if (!(req.user.role == "moderator" || req.user.role == "admin"))
    return res.status(403).send("Access Denied");
  next();
};
