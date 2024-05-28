const jwt = require("jsonwebtoken");
module.exports = {
    validateRegister : (req, res, next)=>{
        //testing checks min length 3 of username
        if(!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                statusCode: 400,
                message: "Username should be min. 3 chars",
            });
        }
        // checking password length
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                statusCode: 400,
                message: "Password should be atleast 6 chars.",
            });
        }

        ///checking password is matched with confirm password
        if(!req.body.password_repeat || req.body.password!= req.body.password_repeat){
            return   res.status(400).send({
                statusCode: 400,
                message: "Password not matched",
            });
           
        }
        next();
    },
};

//module.exports = userMiddleware;