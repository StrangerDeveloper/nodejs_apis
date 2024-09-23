//const jwt = require("jsonwebtoken");
module.exports = {
    validateRegister : (req, res, next)=>{
        //testing checks min length 3 of username
        if(!req.body.name || req.body.name.length < 3){
            return res.status(400).send({
                sucess: false,
                message: "Name should be min. 3 chars",
                data:{}
            });
        }
        // checking password length
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                sucess: false,
                message: "Password should be atleast 6 chars.",
                data:{}
            });
        }

        ///checking password is matched with confirm password
        // if(!req.body.password_repeat || req.body.password!= req.body.password_repeat){
        //     return   res.status(400).send({
        //         statusCode: 400,
        //         message: "Password not matched",
        //     });
           
        // }
        next();
    },
};

//module.exports = userMiddleware;