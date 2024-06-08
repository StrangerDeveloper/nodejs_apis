
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotEnv = require("dotenv");
dotEnv.config();
const uri = process.env.MONGO_ATLAS_URI || '';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = client;





// const mysql = require("mysql2");
// require("dotenv").config();
// const config = {
//     db:{
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         connectTimeout: 60000
//     },
//     listPerPage: 10,
// };

// const conn = mysql.createConnection({
//     // host: config.db.host,
//     // user: config.db.user,
//     // database: config.db.database,
//     //password: config.db.password,
//         // host: process.env.DB_HOST,
//         // user: process.env.DB_USER,
//         // password: process.env.DB_PASS,
//         // database: process.env.DB_NAME,
//     //host: "sql203.infinityfree.com",
//     host: "leadnlms.free.nf",
//     user: "if0_36630619",
//     database: "if0_36630619_restapi",
//     password: "UJkCUn2jQpigqs",
    
// });//.connect();
// //const conn = mysql.createConnection(config.db);
// conn.connect((error)=>{
//     if(error){
//         console.error('Error connecting to database:', error);
//         return;
//     }
//     console.log('Connected to database successfully');
// });

// module.exports = conn;

