const { body } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters needed!"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!")
    .isEmail()
    .withMessage("Please provide valid email!"),

  body("password", "enter a valid password")
    .trim()
    .notEmpty()
    .withMessage("This  fiels can not be empty!")
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters are required"),
];

module.exports = validateUser;
