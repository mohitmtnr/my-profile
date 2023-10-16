const express = require("express");
const authenticate = require("../middleware/auth");
const validateUser = require("../validation/auth");
const {
  createUser,
  login,
  getUserData,
  logout,
} = require("../controller/auth");

const router = express.Router();

//Route : 1
router.post("/createuser", validateUser, createUser);

//Route : 2
router.post("/login", login);

//Route : 3
router.get("/getuser", authenticate, getUserData);
module.exports = router;
