require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workRoutes = require('./routes/workRoutes');
const marksRoutes = require('./routes/marksRoutes');


const app = express();

app.use(cors({
  origin: "https://student-progress-tracker-by-aashish.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

connectDB();

app.get('/', (req,res) =>
{
   res.send("API is running!");  
});

app.use('/api/auth', authRoutes);
app.use('/api/work', workRoutes);
app.use('/api/marks', marksRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => 
{
  console.log(`Server Running On Port : ${port}`);
});

