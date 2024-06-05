import mongoose from "mongoose";
import userModel from "./userSchema.js";
import { hashedPassword,comparedPassword } from "../../utility/hashedPassword.js";
import handleError from "../../utility/errorHandler.js";


export default class UserRepository{

    //------ user signup ------//
    async signup(userData){
        try{
           const {username, email, password} = userData;
           if(!username || !email || !password){
                return {success:false, msg:"Please enter the required field!"}
           }
           const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
           if (!passwordRegex.test(password)) {
            return {success:false, msg:"Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and have a minimum length of 8 characters."}
          }

          const passwordHashed = await hashedPassword(password);
          userData.password = passwordHashed;

          const newUser = new userModel(userData);
          const savedUser = await newUser.save();
          const removedPasswordUser = this.removePasswordField(savedUser);



          return {success:true, msg:"User signup sucessful!", removedPasswordUser};

        }catch(error){
           return handleError(error);
            
        }
    }


    //---------- user signin methods -----------//

    async signin(email, password){
        try{

            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"user not found with this email ID!"};
            }

            const comparePasswordResult = await comparedPassword(password, user.password);
            if(!comparePasswordResult){
                return {success:false, msg:"invalid password!"};
            }

            const removedPasswordUser = this.removePasswordField(user)

            return {success:true, msg:"user signin sucessful!", removedPasswordUser};

        }catch(error){
           

            return handleError(error);
        }
    }


     //========== update user profile ==============//
     async updateProfile(userId, filteredUpdates){
        try{

            console.log("content to be updateable: ", filteredUpdates);
          
           const user = await userModel.findById(userId);
            if(!user){
                return {success:false, msg:"user not found!"};
            }

            for (const key in filteredUpdates) {

                user[key] = filteredUpdates[key];
            }
    
            await user.save();

            const removedPasswordUser = this.removePasswordField(user)
            return {success:true, msg:"User profile is updated sucessfully!", removedPasswordUser}



        }catch(error){
           // console.log("user repository signin error: ", error);
           return handleError(error);
        }
    }







    //======= a utility methods for removing password form user before returning responses =====//
    removePasswordField(user) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

}