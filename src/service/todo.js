const todoModel = require("../model/Todo");


const todoService = {};

//read
todoService.findByProp = (key, value) => {
    if (key === "_id") {
        return todoModel.findById(value).exec();
    } else {
        return todoModel.findOne({ [key]: value }).exec();
    }
};

//update
todoService.updateById = async (taskId, updateData) => {
    
    try {
        const updatedTask = await todoModel.findByIdAndUpdate(
            taskId, 
            updateData, 
            { new: true } 
        ).exec();

        return updatedTask;
    } catch (error) {
        throw error; // Handle the error or return null if not found
    }
};

//delete
todoService.deleteById = async (taskId) => {
    try {
        const deletedTask = await todoModel.findByIdAndRemove(taskId).exec();
        return deletedTask;
    } catch (error) {
        throw error; // Handle the error or return null if not found
    }
};

/**
 * Creates a task in the database
 * @param {{title:String , description:String,todoStatus:number,"authorId:ObjectId"}}
 * @returns {Promise}
 */

todoService.create = async ({title,description,todoStatus,authorId}) => {
    let task;
    task = new todoModel({title,description,todoStatus,authorId});
    return task.save();
};

module.exports = todoService;

