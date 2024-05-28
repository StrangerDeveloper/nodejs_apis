const express = require("express");
const bcrypt  = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const loginRoute = require("./login.route");
const registerRoute = require("./register.router");

const userMiddleware = require("../middleware/user.middleware");

const router = express.Router();

router.post("/register", userMiddleware.validateRegister, registerRoute);
router.post("/login", loginRoute);
router.get("/secret-route", (req, res, next)=>{});

module.exports = router;