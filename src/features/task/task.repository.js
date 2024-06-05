import mongoose from "mongoose";
import taskModel from "./taskSchema.js";
import userModel from "../users/userSchema.js";
import handleError from "../../utility/errorHandler.js";
import moment from "moment";


//======== a ropository class contains methods for all task operations ==========//

export default class TaskRepository{

    //========= craete a new task =========//
    async createTask(taskDetails){
        try{

            const user = await userModel.findById(taskDetails.user);
            if(!user){
                return {success:false, msg:"User not found!"}
            }

            const newTask = new taskModel(taskDetails);
            const savedTask = await newTask.save();

            user.tasks.push(savedTask._id);
            await user.save();

            return {success:true, msg:"Task created sucessfully!", task:savedTask};


        }catch(error){

            return handleError(error);

        }
    }


    //=========== marks the tasks as complete ============//
    async markTaskComplete(taskId, userId){
        try{
            const task = await taskModel.findOne({ _id: taskId, user: userId });
            if (!task) {
                return { success: false, msg: "Task not found or you are not authorized to complete this task!" };
            }

            if(task.completed){
                return { success: false, msg: "Task is already marked as complete!" };
            }

            task.completed = true;
            await task.save();

            return { success: true, msg: "Task marked as complete!", task };

        }catch(error){

            return handleError(error);
            
        }
    }

    //============ update a task ============//
    async updateTask( userId, taskId, updateAbleData){
        try{
            const task = await taskModel.findById(taskId);
            if(!task){
                return { success: false, msg: "Task not found!" };
            }

            if(task.user.toString() !== userId){
                return { success: false, msg: "You are not authorized to update this task!" };
            }

            for (const key in updateAbleData) {
                task[key] = updateAbleData[key];
            }

            const updatedTask=await task.save();
            return {success:true, msg:"Task is updated sucessfully", task:updatedTask};

        }catch(error){
            return handleError(error);
            
        }
    }

    //========== delete a task ============//
    async deleteTask(taskId, userId){
        try{
            const task = await taskModel.findById(taskId);
            const user = await userModel.findById(userId);
            if(!task){
                return {success:false, msg:"task not found!"}
            }

            if(task.user.toString() !== userId.toString()){
                return {success:false, msg:"You are not authorized to remove this task!"}
            }

            const deleteResult = await taskModel.deleteOne({_id:taskId});
            if(deleteResult.deletedCount>0){
                user.tasks.pull(taskId);
                await user.save();
                return {success:true, msg:"Task removed sucessfully!"};
            }else{
                return {success:false, msg:"Task could not be removed!"};
            }


        }catch(error){
           // console.log("delete task error: ", error);
            return handleError(error);
        }
    }


    //============ view all the tasks of users ===========//
    async viewAllTask(userId){
        try{
            const tasks = await taskModel.find({user: userId}).sort({dueDate:1});
            if(tasks.length < 1){
                return {success: false, msg: "No task found!"};
            } else {
                const formattedTasks = tasks.map(task => {
                    return {
                        ...task.toObject(),
                        dueDate: moment(task.dueDate).format('D MMM YYYY')
                    };
                });
                let totalTask = tasks.length;
                return {success: true, msg: `You have ${totalTask} tasks found`, tasks: formattedTasks};
            }
        }catch(error){
          // console.log("view all task repository error: ", error);
            return handleError(error);
        }
    }

    //========= view all pending task ==============//
    async viewAllPendingTask(userId){
        try{
            const tasks = await taskModel.find({user:userId, completed:false}).sort({dueDate:1});
            if(tasks.length < 1){
                return {success: false, msg: "No pending task found!"};
            }else {
                const formattedTasks = tasks.map(task => {
                    return {
                        ...task.toObject(),
                        dueDate: moment(task.dueDate).format('D MMM YYYY')
                    };
                });
                let totalTask = tasks.length;
                return {success: true, msg: `You have ${totalTask} pending tasks found`, tasks: formattedTasks};
            }


        }catch(error){
           // console.log("view pending task repository error: ", error);
            return handleError(error);
        }
    }


    //============ find the task by category ============//
    async findTaskByCategory(category, userId){
        try{

            //======= make sure that category may be single string or an array and it ignores case sensitivity ===//
            let categoryFilter;

            if (Array.isArray(category)) {
                categoryFilter = { $in: category.map(cat => new RegExp(`^${cat}$`, 'i')) };
            } else {
                categoryFilter = new RegExp(`^${category}$`, 'i');
            }
    
            const tasks = await taskModel.find({ user: userId, category: categoryFilter });
    
            if (tasks.length === 0) {
                return { success: false, message: "No tasks found for the specified category." };
            } else {
                return { success: true, msg:"Tasks found for the specified category.", tasks:tasks };
            }


        }catch(error){
            //console.log("view task by category repository error: ", error);
            return handleError(error);
        }
    }


    //============ find tasks by search term ============//
    async findTaskBySearchTerm(searchTerm, userId) {
        try {

           
        const query = { user: userId };

        //---- Processing each key in the searchTerm object -----//
        for (const [key, value] of Object.entries(searchTerm)) {
            if (key === 'category' || key === 'title') {
                query[key] = new RegExp(value, 'i'); //-- ignore case sensitive
            } else if (key === 'completed') {
                query[key] = value === true || value === 'true';//-- either complete true or false
            }
        }

        const tasks = await taskModel.find(query);

        if (tasks.length === 0) {
            return { success: false, msg: "No tasks found for the specified search term." };
        } else {
            return { success: true, msg: "Tasks found for the specified search term.", tasks: tasks };
        }
           
        } catch (error) {
           // console.log("find task by search term repository error: ", error);
            return handleError(error);
        }
    }

}