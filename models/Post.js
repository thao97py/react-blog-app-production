const mongoose = require("mongoose")  //import momgoose lib 
const PostSchema = new mongoose.Schema({
   title:{  /*post's title */
       type:String,
       required:true,
       unique:true,
   },
   desc:{  /*description*/
    type:String,
    required:true,
   },
   photo:{ /*post's photo */
    type:String,
    required:false,
   },
   username:{ /*author */
    type:String,
    required:true,
   },
   categories:{
       type:Array, /**["life", "music","love", ..] */
       required:false,
   }

},{timestamps:true}  /*update/create timestamps correspondingly*/
);

module.exports = mongoose.model("Post",PostSchema); 
/*export schema, "Post" is the name of the table and PostChema is the properties of the table*/