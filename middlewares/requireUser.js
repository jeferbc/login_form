const mongoose = require("mongoose");
const User = require("../models/user");

const requireUser = async (req, res, next) => {
  console.log(req.session.userId)
  const userId = req.session.userId;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    res.locals.user = user;
    next();
  } else {
    console.log('redirect')
    return res.redirect('/login');
  }
}

module.exports = requireUser;
