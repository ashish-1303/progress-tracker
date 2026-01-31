const Work = require('../models/Work');

exports.addWork = async(req,res) =>
{
  try
  {
    const { title, subject, type } = req.body;
    
    const work = await Work.create({
      title,
      subject,
      type,
      student: req.user.id  
    });

    res.status(201).json(work);
  }  
  catch(error)
  {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyWork = async (req, res) => 
{
  try 
  {
    const work = await Work.find({ student: req.user.id });
    res.json(work);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};


exports.markCompleted = async (req, res) => 
{
  try 
  {
    const work = await Work.findById(req.params.id);

    if (!work) return res.status(404).json({ message: "Work not found" });

    if (work.student.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    work.status = "completed";
    await work.save();

    res.json(work);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
  
};