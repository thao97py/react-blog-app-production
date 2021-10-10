const mongoose = require("mongoose")  //import momgoose lib 
const CategorySchema = new mongoose.Schema(
    {
    catName:{
            type:String,
            require:true,
        },
    },
    {timestamps:true}  /*update/create timestamps correspondingly*/
);

module.exports = mongoose.model("Category",CategorySchema); 
/*export schema, "Category" is the name of the table and CategorySchema is the properties of the table*/ 