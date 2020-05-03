var db = require('../db')
module.exports.count = (req,res,next) => {
  var count = db.get('count').value();
  db.update('count', t => t + 1).write()
  console.log(req.signedCookies,count)
  next();
}