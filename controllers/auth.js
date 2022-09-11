const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt, ExpressJwtRequest } = require("express-jwt");
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
  const { email, encry_password } = req.body;
  const plainPassword = encry_password;
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "User email does't exist.",
        });
      }

      // check wheather the enter password is correct or not.

      // ! NOT MATCH => NOT WORKING
      if (!user.comparePassword(plainPassword)) {
        return res.status(401).json({
          error: "Email and Password do not match !!",
        });
      }

      //*  signin means , create a token and put the token in the cookie.

      // CREATE TOKEN
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      // PUT TOKEN IN COOKIE
      res.cookie("token", token, { expire: new Date() + 9999 });

      // SEND RESPONSE TO FRONT-END
      const { _id, name, email, role } = user;
      res.json({ token, user: { _id, name, role } });
    }
  );
};
