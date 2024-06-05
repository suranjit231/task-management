import bcrypt from "bcrypt";


//------- hashed the password ---------//
export const hashedPassword = async (password)=>{
    const passwordHashed = await bcrypt.hash(password, 12);
    return passwordHashed;

}


//------- compared the password with hashed password 

export const comparedPassword = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword)
}