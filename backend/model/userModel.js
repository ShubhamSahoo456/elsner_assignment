const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.passwordCheck = async function (password) {
  try {
    const veriPassword = await bcrypt.compare(password, this.password);
    if (veriPassword) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
