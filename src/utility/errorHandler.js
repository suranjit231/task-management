//=========== a utility methods for handling error ==========//

const handleError = (error) => {
    //console.log("Error: ", error);
    
    if (error.name === "ValidationError") {
        return { success: false, msg: error.message };
    } else if (error.code && error.code === 11000) {

        const duplicateField = Object.keys(error.keyPattern)[0];
        const customMessage = `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} is already in use!`;
        return { success: false, msg: customMessage };

    } else if (error.kind === "ObjectId") {
        return { success: false, msg: "Invalid ID format!" };
    } else {
        return { success: false, msg: "Server error, please try later!" };
    }
};



//============= caught unhandle error globally =============//
export function errorHandler(err, req, res, next) {
    console.error(err.stack); 
    
    // Send an error response to the client
    res.status(500).json({ success: false, msg: "Internal server error" });
}





export default handleError;