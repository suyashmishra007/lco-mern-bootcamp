const express = require("express");
const router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "name should be aleast 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("encry_password", "password should be atleast 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required.").isEmail(),
    check("encry_password", "password field is required.").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
