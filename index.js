const express = require("express");
const dotEnv = require("dotenv");
const userRouter = require("./routes/user.router");
const mongoose = require("mongoose");

dotEnv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }));
  // Middleware to parse JSON
app.use(express.json());

const uri = process.env.MONGO_ATLAS_URI || '';

//mongoose.connect(uri);


//const database = mongoose.connection;

// Connect to MongoDB
mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
  app.get("/", (req, res) => res.send("Express on Vercel Connected"));
// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204));

app.use("/api", userRouter);

  app.listen(port, () => {
    console.log(`Server is connected with port: ${port}`);
  });
  
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});



// database.on('error', (error) => {
//   console.log(error)
// });

// database.once('connected', () => {
//   console.log('Database Connected');
//   //vercel required this
//   app.get("/", (req, res) => res.send("Express on Vercel Connected"));

//   app.use("/api", userRouter);
//   app.listen(port, () => {
//     console.log(`Server is connected with port: ${port}`);
//   });
// });


//app.use(cors());




