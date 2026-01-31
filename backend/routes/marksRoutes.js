const express = require('express');
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const { saveMarks, getMyMarks } = require("../controllers/marksController");

router.post('/', protect, saveMarks);
router.get('/', protect, getMyMarks);

module.exports = router;