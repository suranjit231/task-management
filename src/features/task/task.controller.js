import TaskRepository from "./task.repository.js";


//============ a controller class contains all the methods related task (req/res) ======//

export default class TaskController{
    constructor(){
        this.taskRepository = new TaskRepository();
    }


    //====== handle create new task request ========//
    async createTask(req,res,next){
        try{
            const userId = req.userId;
            const taskData = req.body ;

            //----- check task title should't empty -----//
            if (!taskData.title || taskData.title.trim() === "") {
                return res.status(400).json({ success: false, message: "Title is required!" });
            }

            taskData.user = userId;
            const result = await this.taskRepository.createTask(taskData);
            if(!result.success){
                return res.status(404).json(result);

            }else{
                return res.status(201).json(result);
            }
    

        }catch(error){
            res.status(404).json(error.msg);
        }
    }


    //========== mark task complete =========//
    async markTaskComplete(req,res,next){
        try{
            const userId = req.userId;
            const taskId = req.params.id;

            if(!taskId){
                return res.status(404).json({success:false, msg:"taskId is required to mark the task!"})
            }

            const result = await this.taskRepository.markTaskComplete(taskId, userId);
            if(!result.success){
                return res.status(404).json(result);
            }else{
                return res.status(200).json(result);
            }

        }catch(error){
            res.status(404).json(error);
        }
    }

    //============ update the task ================//
    async updateTask(req,res,next){
        try{
            const userId = req.userId;
            const taskId = req.query.taskId;
            const updateData = req.body;

            let errors = [];
            //======== checking the fields that can't updateable =======//
            for (const key in updateData) {
                if (["complete", "user", "userId", "title"].includes(key.trim().toLowerCase())) {
                    errors.push(`Cannot update ${key}. Please refer to our documentation for details.`);
                }
            }

            if(errors.length>0){
                return res.status(404).json({success:false, msg:errors[0]});
            }

            const filteredUpdates = {};
            for(const key in updateData){
                console.log("key console: ", key);
                if(key.trim().toLowerCase() !== "taskid"){
                    filteredUpdates[key] = updateData[key];
                }
            }


            const result = await this.taskRepository.updateTask(userId, taskId, filteredUpdates);
            if(!result.success){
                return res.status(404).json(result);
            }else{
                return res.status(200).json(result);
            }


        }catch(error){
            res.status(404).json(error);
        }
    }

    //=========== delete a task ================//
    async deleteTask(req,res,next){
        try{
            const userId = req.userId;
            const taskId = req.query.taskId;

            if(!taskId){
                return res.status(404).json({success:false, msg:"Task Id is requied to delete a task!"});
            }

            const deleteResult = await this.taskRepository.deleteTask(taskId, userId);
            if(!deleteResult.success){
                return res.status(404).json(deleteResult);
            }else{
                return res.status(200).json(deleteResult);
            }

        }catch(error){
            res.status(404).json(error);
        }

    }

    //=========== find task by category =============//
    async findTaskByCategory(req,res,next){
        try{
            const userId = req.userId;
            const category = req.query.category;
            if(!category){
                return res.status(404).json({success:false, msg:"Please select a category!"});
            }

            const tasks = await this.taskRepository.findTaskByCategory(category, userId);
            if(!tasks.success){
                return res.status(404).json(tasks);
            }else{
                return res.status(200).json(tasks);
            }

        }catch(error){
            res.status(404).json(error);
        }
    }


    //============ view all the user task ===========//
    async viewAllTask(req,res,next){
        try{
            const userId = req.userId;
            const tasks = await this.taskRepository.viewAllTask(userId);

            if(!tasks.success){
                return res.status(404).json(tasks);
            }else{
                return res.status(200).json(tasks);
            }

        }catch(error){
            res.status(404).json(error);
        }
    }

    //======== view all pending task ==========//
    async viewAllPendingTask(req,res,next){
        try{
            const userId = req.userId;
            const tasks = await this.taskRepository.viewAllPendingTask(userId);

            if(!tasks.success){
                return res.status(404).json(tasks);
            }else{
                return res.status(200).json(tasks);
            }

        }catch(error){
            res.status(404).json(error);
        }
    }


   //=========== find a task by search term ==========//
async findTaskBySearchTerm(req, res, next) {
    try {
        const userId = req.userId;
        const searchTerm = req.query;
        console.log("searchTerm: ", searchTerm);

       

        //------ Check if searchTerm object is provided and has at least one valid key-value pair ----//
        if (!searchTerm || Object.keys(searchTerm).length === 0 || !Object.values(searchTerm).some(value => value !== undefined)) {
            return res.status(400).json({ success: false, msg: "Please provide a valid search term!" });
        }

        const tasks = await this.taskRepository.findTaskBySearchTerm(searchTerm, userId);
        if (!tasks.success) {
            return res.status(404).json(tasks);
        } else {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        console.log("find task by search term controller error: ", error);
        res.status(500).json(error);
    }
}


}