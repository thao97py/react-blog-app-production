const mongoose = require("mongoose")  //import momgoose lib 
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    profilePic:{
        type:String,
        default:"maleAvatar.png",
    },
},{timestamps:true}  /*update/create timestamps correspondingly*/
);

module.exports = mongoose.model("User",UserSchema); 
/*export schema, "User" is the name of the table and UserSchema is the properties of the table*/ 