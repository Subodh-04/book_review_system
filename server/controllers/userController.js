const User = require("../models/userModel");
const generateToken = require("../config/auth");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists!" });
    } else {
      const user = await User.create({ username, email, password });
      if (user) {
        res.status(200).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = { signup, login };
