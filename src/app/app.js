const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("../router/user");
const todoRouter = require("../router/todo");

const app = express();

app.use(cors());
app.use(express.json());

//user route
app.use("/api/v1/user",userRouter);

//todo route
app.use("/api/v1/todo",todoRouter);



module.exports = app;


