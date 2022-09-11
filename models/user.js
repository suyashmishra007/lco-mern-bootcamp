const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    // salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("encry_password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.encry_password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.encry_password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(
    candidatePassword,
    this.encry_password,
    function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};
module.exports = mongoose.model("User", userSchema);
