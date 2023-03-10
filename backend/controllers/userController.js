const User = require("../model/userModel");

const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const userData = await newUser.save();
    if (userData) {
      res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      const checkPassword = await findEmail.passwordCheck(password);
      if (checkPassword) {
        res.status(200).json(findEmail);
      } else {
        res.status(400).json({ message: "email/password incorrect" });
      }
    } else {
      res.status(404).json({ message: "email/password incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
