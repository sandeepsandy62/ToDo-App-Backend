const express = require("express");

const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization");
const todoController = require("../controller/todo");


const todoRouter = express.Router();

//create task
todoRouter.post("/create",todoController.create);

//read task
todoRouter.get("/read/:id",authenticate,authorize,todoController.read);

//update task
todoRouter.put("/update/:id",authenticate,authorize,todoController.update);

//delete task
todoRouter.delete("/delete/:id",authenticate,authorize,todoController.delete);

module.exports = todoRouter;