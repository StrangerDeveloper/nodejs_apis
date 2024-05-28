const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const routes = require("./routes/router");

dotEnv.config();
const port =  process.env.PORT || 5000;

app.use(
    express.urlencoded({
      extended: true,
    }));
app.use(express.json());
app.use(cors());

app.use("v1/api", routes);

app.listen(port, ()=>{
    console.log(`Server is connected with port: ${port}`);
});