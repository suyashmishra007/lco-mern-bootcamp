const { validationResult } = require("express-validator");

const User = require("../models/user");
exports.signout = (req, res) => {
  res.json({
    message: "user signout",
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  try {
    const user = new User(req.body);
    user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Not able to save user in DB",
        });
      }
      return res.json({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    });
  } catch (error) {
    res.json(error);
  }
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  try {
    const user = new User(req.body);
    user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Not able to save user in DB",
        });
      }
      return res.json({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    });
  } catch (error) {
    res.json(error);
  }
};
