const express = require("express");
const router = express.Router();
const { signout, signup } = require("../controllers/auth");
const { check } = require("express-validator");

router.get("/signout", signout);
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

module.exports = router;
