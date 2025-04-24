const { registerUser } = require("../controller/UserCt");

const UserRoute = require("express").Router();

UserRoute.post("/", registerUser);


 module.exports= UserRoute
