require("dotenv").config("../../.env");

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {error,responseSender} = require("../util/script");
const todoService = require("../service/todo");

const todoController = {};

//create a task
todoController.create = async(req,res,next) => {

    /*
    *{title,description,todoStatus} = input()
    * todo status 
    *     --> incomplete --> -1
    *     --> inProgress --> 0
    *     --> complete --> 1
    */

    try{
        const title = typeof req.body.title === "string" ? req.body.title : null;
        const description = typeof req.body.description === "string" ? req.body.description : "";
        const todoStatus = typeof req.body.todoStatus === "string" ? req.body.todoStatus : "inComplete" ;
        let authorId = typeof req.body.authorId === "string" ? req.body.authorId : null;
        authorId = new ObjectId(authorId);
        console.log(authorId);
       
        if(!title || !authorId){
            throw error(
                400,
                "Missing Fields"
            )
        }

        const task = await todoService.create({
            title,
            description,
            todoStatus,   
            authorId,    
        });

        if(!task){
            throw error(
                500,
                "Error in the server side",
            );
        }else{
            const payload = {
                title : task.title,
                description : task.description,
                todoStatus : task.todoStatus,
                authorId:task.authorId,
               
            };
            responseSender(res,201,{
                message:"task added successfully",
                task : payload,
            });
        }
    }catch(err){
        console.log("error is here");
        next(err);
    }
}

//read a task
todoController.read = async (req, res, next) => {
    try {
        
        const id = req.params.taskId; 

        const task = await todoService.findByProp("id",id);
        console.log(task);

        if (!task) {
            throw error(
                404,
                "Task not found"
            );
        } else {
            const payload = {
                title: task.title,
                description: task.description,
                todoStatus: task.todoStatus,
                authorId: task.authorId,
            };
            responseSender(res, 200, {
                message: "Task retrieved successfully",
                task: payload,
            });
        }
    } catch (err) {
        console.log("Im here");
        next(err);
    }
};


//update a task
todoController.update = async (req, res, next) => {
    try {
        const taskId = req.params.id; 
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            todoStatus: req.body.todoStatus,
        };

        
        // Update the task by its ID using the service
        const updatedTask = await todoService.updateById(taskId, updateData);

        if (!updatedTask) {
            throw error(
                404,
                "Task not found"
            );
        } else {
            const payload = {
                title: updatedTask.title,
                description: updatedTask.description,
                todoStatus: updatedTask.todoStatus,
                authorId: updatedTask.authorId,
            };
            responseSender(res, 200, {
                message: "Task updated successfully",
                task: payload,
            });
        }
    } catch (err) {
        next(err);
    }
};


//delete a task
todoController.delete = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        // Call the service to delete the task by its ID
        const deletedTask = await todoService.deleteById(taskId);

        if (!deletedTask) {
            throw error(
                404,
                "Task not found"
            );
        } else {
            const payload = {
                title: deletedTask.title,
                description: deletedTask.description,
                todoStatus: deletedTask.todoStatus,
                authorId: deletedTask.authorId,
            };
            responseSender(res, 200, {
                message: "Task deleted successfully",
                task: payload,
            });
        }
    } catch (err) {
        next(err);
    }
};




module.exports = todoController;