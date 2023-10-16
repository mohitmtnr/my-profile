const { body } = require("express-validator");

exports.validateExperties = [
  body("title").trim().notEmpty().withMessage("This field can not be empty"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty"),
  body("WebTechnologyFontAwesomeTag")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty"),
  body("experience")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty"),
  body("highlightTopics")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty"),
  body("imageUrl").trim().notEmpty().withMessage("This field can not be empty"),
  body("referralLinks")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty"),
];
