const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) =>
{
  try 
  {
    // Getting token from request header...
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) 
    {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    // Verifying the token...
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attaching user to the request (without password)...
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) 
    {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } 
  catch (error) 
  {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
