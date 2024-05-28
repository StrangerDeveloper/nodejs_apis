const db = require("../config/config");
const bcrypt  = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next)=>{
    db.query(
        `SELECT * FROM users WHERE username = ?;`,
        [req.body.username],
        (err, result)=>{
            if(err){
                return res.status(400).send({
                statusCode: 400,
                message: err,    
                });
            
            }
            if(!result.length){
                return res.status(400).send({
                    statusCode: 400,
                    message: "Username or password incorrect!",    
                    });
            }
            bcrypt.compare(req.body.password, result[0]['password'], 
                (enErr, enResult)=>{
                    if(enErr){
                        return res.status(400).send({
                            statusCode: 400,
                            message: "Username or password incorrect!",    
                            });
                    }
                    if(enResult){
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id,
                        },
                        'SECRETKEY', {expiresIn: '3d'}
                    );
                    db.query(`UPDATE users SET last_login = now() WHERE id = ?;`,
                     [
                        result[0].id,
                      ]);

                      return res.status(200).send({
                        statusCode: 200,
                        message: 'Logged in!',
                        token,
                        user: result[0],
                    });
                    }
                    return res.status(400).send({
                        statusCode: 400,
                        message: 'Username or password not correct',
                    
                    });
                }
            );
        }
    );
};