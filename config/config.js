const mysql = require("mysql2");
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

const conn = mysql.createConnection({
    // host: config.db.host,
    // user: config.db.user,
    // database: config.db.database,
    // password: config.db.password,
    host: "leadnlms.free.nf",
    user: "if0_36630619",
    database: "if0_36630619_restapi",
    password: "UJkCUn2jQpigqs",
    
}).connect();
//const conn = mysql.createConnection(config.db);
//conn.connect();

module.exports = conn;