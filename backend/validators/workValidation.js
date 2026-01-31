const { body } = require("express-validator");

exports.createWorkValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required"),

  body("type")
    .isIn(["assignment", "project"])
    .withMessage("Type must be assignment or project")
];
