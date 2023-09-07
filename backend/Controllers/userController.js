const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const User = require("../Modals/userModal");

const userLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter Email and Password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const userRegister = asynchandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(403);
    throw new Error("Please fill a fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User Not Registered");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};
const authUser = asynchandler(async (req, res) => {
  const { _id, firstName, lastName, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
  });
});

module.exports = {
  userLogin,
  userRegister,
  authUser,
};
