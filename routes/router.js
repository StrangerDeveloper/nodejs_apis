const express = require("express");
const userRouter = require("./routes/user.router");
//const bcrypt  = require("bcryptjs");
//const uuid = require("uuid");
//const jwt = require("jsonwebtoken");
const loginRoute = require("./login.route");
const registerRoute = require("./register.router");
const getUsers =  require("./getuser");

const userMiddleware = require("../middleware/user.middleware");

const router = express.Router();

router.post("/registerUser", userMiddleware.validateRegister, registerRoute);
router.post("/login", loginRoute);
router.get("/getUsers", getUsers);
router.get("/secret-route", (req, res, next)=>{});

module.exports = router;