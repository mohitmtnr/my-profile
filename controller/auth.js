const User = require("../models/User");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET || "123456789@123456789";
const pepper = "@org123";
// create user

exports.createUser = async (req, res) => {
  //checking validation result
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    //checking if user already exist
    let checkUserAlreadyExist = await User.findOne({ email: req.body.email });
    if (checkUserAlreadyExist) {
      return res
        .status(400)
        .json({ error: "Sorry! A user with the same email already exists." });
    }

    const salt = await bcyrpt.genSalt(10);
    const hashedPasword = await bcyrpt.hash(req.body.password + pepper, salt);

    //finally creating new user and adding it to database
    const { name, email, mobile } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPasword,
      mobile: mobile,
    });
    // res.json("Successfully created new user");

    let userData = await User.findOne({ email });
    console.log(userData);

    const jwtData = {
      user: { id: userData._id },
    };
    console.log(jwtData);
    const authToken = jwt.sign(jwtData, JWT_SECRET);
    res.json(authToken);
  } catch (error) {
    // using simple -- should be added to logger or SQS
    return res.status(500).json(error);
  }
};

// login

exports.login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please enter correct credentials!" });
    }
    let comparePassword = await bcyrpt.compare(
      password + pepper,
      user.password
    );
    if (!comparePassword) {
      return res
        .status(400)
        .json({ error: "Please enter correct credentials!" });
    }

    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
    res.json(authToken);
  } catch (err) {
    return res.status(500).send("internal sever error!");
  }
};

//fetch user data
exports.getUserData = async (req, res) => {
  try {
    let userData = await User.find({}).select("-password");
    if (!userData) {
      return res.status(400).json({ error: "Data can not be found!" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
