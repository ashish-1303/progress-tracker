const Marks = require('../models/Marks');

exports.saveMarks = async (req, res) => {
  try {
    const { totalMarks, obtainedMarks } = req.body;

    if (obtainedMarks > totalMarks) {
      return res.status(400).json({ message: "Invalid marks!" });
    }

    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
    const cgpa = ((obtainedMarks / totalMarks) * 10).toFixed(2);

    let marks = await Marks.findOne({ student: req.user._id });

    if (marks) 
    {
      marks.totalMarks = totalMarks;
      marks.obtainedMarks = obtainedMarks;
      marks.percentage = percentage;
      marks.cgpa = cgpa;
      await marks.save();
    } 
    else 
    {
      marks = await Marks.create({
        totalMarks,
        obtainedMarks,
        percentage,
        cgpa,
        student: req.user._id,
      });
    }

    res.status(200).json({ percentage: marks.percentage, cgpa: marks.cgpa });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyMarks = async (req, res) => {
  try {
    const marks = await Marks.findOne({ student: req.user._id });
    if (!marks) {
      return res.status(404).json({ message: "No marks found!" });
    }

    res.status(200).json({
      totalMarks: marks.totalMarks,
      obtainedMarks: marks.obtainedMarks,
      percentage: marks.percentage,
      cgpa: marks.cgpa,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
