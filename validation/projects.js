const { body } = require("express-validator");

exports.validateProjects = [
  body("title", "empty").notEmpty(),
  body("description", "empty").notEmpty(),
  body("company", "empty").notEmpty(),
  body("imageUrl", "empty").notEmpty(),
  body("websiteLink", "empty").notEmpty(),
  body("usedWebTechnologies", "empty").notEmpty(),
  body("startDate", "empty").notEmpty(),
  body("endDate", "empty").notEmpty(),
  body("WebTechnologyFontAwesomeTag", "empty").notEmpty(),
  body("experienceGained", "empty").notEmpty(),
];
