const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const {
  addWork,
  getMyWork,
  markCompleted } = require("../controllers/workController");

const { createWorkValidation } = require("../validators/workValidation");
const { validationResult } = require("express-validator");

// Create assignment / project
router.post(
  "/",
  protect,
  createWorkValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addWork
);

// Get all work of logged-in student
router.get("/", protect, getMyWork);

// Mark work as completed
router.put("/:id/complete", protect, markCompleted);

module.exports = router;
