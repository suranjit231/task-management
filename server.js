import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectMongodb from "./src/connectMongodb/connectMongodb.js";
import cors from "cors";
import userRoutes from "./src/features/users/user.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./src/features/task/task.routes.js";
import { auth } from "./src/middleware/jwtAuth.middleware.js";
import { errorHandler } from "./src/utility/errorHandler.js";
import swagger from "swagger-ui-express";
import apiDocs from './swagger.json' assert {type: 'json'};


const app = express();

//======== setup middleware for request data parsing ==========//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//======== handling routes for different feature routes =======//
//----- swagger documentation api-----//
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));


app.use("/api/users", userRoutes);

app.use("/api/tasks", auth, taskRoutes);




//========= listening request for default routes ============//
app.get("/", (req,res,next)=>{
    res.redirect("/api-docs");
});

//========= error response for invalid path ===================//
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Invalid path please refer our documentaion on localhost:3200/api-docs" });
});


//======== Add the error handler middleware ==============//
app.use(errorHandler);


//========= listening in port ===============================//
let PORT = process.env.PORT || 3200 ;
app.listen(PORT, ()=>{
    console.log(`app is listen on port ${PORT}`);
    connectMongodb();
})