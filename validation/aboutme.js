const { body } = require("express-validator");

exports.validateAboutMe = [
  body("degree").trim().notEmpty().withMessage("This field can not be empty!"),
  body("institution")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!"),
  body("startDate")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!"),
  body("endDate").trim().notEmpty().withMessage("This field can not be empty!"),
  body("percentageObtained")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!"),
  body("subjectStudied")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!"),
  body("boardOfEducation")
    .trim()
    .notEmpty()
    .withMessage("This field can not be empty!"),
];
