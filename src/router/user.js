const express = require("express");

const userController = require("../controller/user");

const userRouter = express.Router();

//signup
userRouter.post("/register",userController.register);

//signin
userRouter.get("/login",userController.login);



module.exports = userRouter;