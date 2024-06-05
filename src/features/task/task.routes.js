//====================== taskRoutes file for all task operation =======================//
import express from "express";
import TaskController from "./task.controller.js";


const taskRoutes = express.Router();
const taskController = new TaskController();


//=========== create a new task routes ===============//
taskRoutes.post("/createTask", (req,res,next)=>{
    taskController.createTask(req,res,next);
});

//============= marks task complete ==================//
taskRoutes.put("/markTask/:id", (req,res,next)=>{
    taskController.markTaskComplete(req,res,next);
});

//============= view all the task ===================//
taskRoutes.get("/viewAllTask", (req,res,next)=>{
    taskController.viewAllTask(req,res,next);
});

//============= view all the pending task ===========//
taskRoutes.get("/pendingTask", (req,res,next)=>{
    taskController.viewAllPendingTask(req,res,next);
});

//============= filtered task by category ===========//
taskRoutes.get("/byCategory", (req,res,next)=>{
    taskController.findTaskByCategory(req,res,next);
});

//============ find task by search term =============//
taskRoutes.get("/bySearch", (req,res,next)=>{
    taskController.findTaskBySearchTerm(req,res,next);
})


//============= update a task =====================//
taskRoutes.put("/updateTask", (req,res,next)=>{
    taskController.updateTask(req,res,next);
});

//============ delete a task ======================//
taskRoutes.delete("/deleteTask", (req,res,next)=>{
    taskController.deleteTask(req,res,next);
})

export default taskRoutes;