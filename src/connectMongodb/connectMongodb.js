import mongoose from "mongoose";



//========= connecting mongodb using mongoose =================//
const connectMongodb = async()=>{

    try{
        await mongoose.connect(process.env.DB_URL+"/Task_DB",
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log("mongodb is connected!")

    }catch(error){
        console.log("mongodb connection falid!")

    }

}

export default connectMongodb;