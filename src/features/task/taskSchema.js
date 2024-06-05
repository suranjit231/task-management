import mongoose from "mongoose";
import moment from "moment";

//============= schema defination for task =====================//
const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },

    title:{
        type:String,
        required:[true, "Title is required!"],
        trim:true,
        unique:[true, "Task is already exist!"]
    },

    description:{
        type:String,
        trim:true
    },

    completed:{
        type:Boolean,
        default:false
    },

    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                //----- Validate if the due date is not in the past -----//
                return moment(value).isSameOrAfter(moment().startOf("day"));
            },
            message: "Due date must be a future date.",
        },
    },
    category:{
        type:String,
        enum:{
            values:['Work', 'Personal', 'Shopping', 'Other'],
            message: 'Category should be one of the following: Work, Personal, Shopping, Other'

        },
        
        default: 'Other',
        trim: true
    }

}, {timestamps:true});

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;

