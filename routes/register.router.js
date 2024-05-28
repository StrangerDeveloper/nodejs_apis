const dbConfig = require("../config/config");
const bcrypt  = require("bcryptjs");
const uuid = require("uuid");


const registerUser = (req, res, body)=>{
    dbConfig.query("SELECT id FROM users WHERE LOWER(username) = LOWER(?)",
    [req.body.username],
    (err, result)=> {
        if(result && result.length){
            return res.status(409).send({
                statusCode: 409,
                message: "Username already exist!",
            });
        }else{
            //encrypt the password
              bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).send({
                        statusCode: 500,
                        message: err,
                    });
                }else{
                    dbConfig.query("INSERT INTO users (id, username, password, registered) VALUES (?,?,?,now());", [uuid.v4(), req.body.username, hash], (err, result)=>{
                        if(err){
                            return req.status(400).send({
                                statusCode: 400,
                                message: err, 
                            });
                        }
                        return res.status(200).send({
                            statusCode: 200,
                            message: "Registered!",
                        });
                    });
                }

              });  
        }
    }
);
};

module.exports = registerUser;