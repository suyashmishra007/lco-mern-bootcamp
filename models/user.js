const mongoose = require("mongoose");
const { createHmac } = require("node:crypto");
const { Schema } = mongoose;
const uuidv4 = require("uuid");

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
    salt: String,
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

userSchema
  .virtual("password")
  .set(function (password) {
    // using _ means , we keep _password private.
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this.password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      const tempSalt = this.salt;
      const hashpassword = createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");

      console.log(tempSalt);
      console.log(hashpassword);
      return hashpassword;
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

// const { createHmac } = require("node:crypto");

// const secret = "abcdefg";
// const hash = createHmac("sha256", secret)
//   .update("I love cupcakes")
//   .digest("hex");
// console.log(hash);
