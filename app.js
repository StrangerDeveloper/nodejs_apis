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
app.use(express.json());
const uri = process.env.MONGO_ATLAS_URI || '';

mongoose.connect(uri);


const database = mongoose.connection;


database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
  //vercel required this
  app.get("/", (req, res) => res.send("Express on Vercel Connected"));

  app.use("/api", userRouter);
  app.listen(port, () => {
    console.log(`Server is connected with port: ${port}`);
  });
});


//app.use(cors());




