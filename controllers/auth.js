const User = require("../models/user");

exports.signout = (req, res) => {
  res.json({
    message: "user signout",
  });
};

exports.signup = (req, res) => {
  try {
    const user = new User(req.body);
    user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: "Not able to save user in DB",
        });
      }
      return res.json(data);
    });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
