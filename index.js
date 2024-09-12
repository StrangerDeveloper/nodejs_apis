const express = require("express");
const dotEnv = require("dotenv");
const userRouter = require("./routes/user.router");
const mongoose = require("mongoose");
const functions = require("firebase-functions");

dotEnv.config();

//const internalPort = process.env.INTERNAL_PORT || 5000;
const uri = process.env.MONGO_ATLAS_URI || '';
const app = express();



// Middleware to parse JSON
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Express on Vercel");
// });



//const database = config.client;

//app.use("/api", userRouter);

// app.listen(port, () => {
//   console.log("Running on port 5000.");
// });

// Export the Express API
//module.exports = app;

app.use(
  express.urlencoded({
    extended: true,
  }));
// Middleware to parse JSON
//app.use(express.json());


//mongoose.connect(uri);


const database = mongoose.connection;

// Connect to MongoDB
//mongodb+srv://adnan_es_node:qkDGpfDHjTQGCNgD@clusternodeapis.ouujwyu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNodeApis
mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
 app.get("/", (req, res) => res.send("Express on Firebase Connected"));
  // Handle favicon.ico requests
  //app.get('/favicon.ico', (req, res) => res.status(204).send('favicon not found'));

  app.use("/v1", userRouter);

  // app.listen(port, () => {
  //   console.log(`Server is connected with port: ${port}`);
  // });

}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Export the Express API
//module.exports = app;


// database.on('error', (error) => {
//   console.log(error)
// });


exports.api = functions.https.onRequest(app);

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




