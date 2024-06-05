import mongoose from 'mongoose';

const { Schema } = mongoose;

//============== user schema defination ================//
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {type: String, unique: [true, "Email is already exist!"], required: true,
    match: [/.+\@.+\../, "Please enter a valid email"]
 },
  password: {
    type: String,
    required: true
  },
  gender:{
    type:String,
    enum:["Male", "Female"]
  },
    avatar: {
      type: String,
      trim: true
    },
    tasks:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
      }
    ]
   
}, {
  timestamps: true
});


//============= export the User model ==============//
const userModel = mongoose.model('User', userSchema);
export default userModel;