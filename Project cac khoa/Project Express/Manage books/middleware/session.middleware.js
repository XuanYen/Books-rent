const User = require("../models/user.model.js");
const Session = require("../models/session.model.js");

module.exports = async (req, res, next) => {
  if (req.signedCookies.userId) {
    var user = await User.findById(req.signedCookies.userId);
    if (user) {
      res.locals.user = user;
    }
  }
  if (!req.signedCookies.sessionId) {
    var newSession = await Session.create({});
    res.cookie("sessionId", newSession._id, {
      signed: true
    });
  }
  var session = await Session.findById(req.signedCookies.sessionId);
  var count = 0;
  if (session) {
    for (var book of session.cart) {
      count += book.quantitude;
    }
  }
  res.locals.count = count;
  next();
};
