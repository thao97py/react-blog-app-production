//url to create, upate or delete users

const router = require("express").Router(); //import Rour=ter object of express framework
const User = require("../models/User"); //import User model
const Post = require("../models/Post"); //import User model
const bcrypt = require("bcrypt");


//UPDATE USER
router.put("/:id", async(req,res)=>{ 
    if(req.body.userId === req.params.id){
        if(req.body.password){ //if the put request body has new pasword value
            const salt= await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
            res.status(200).json(updatedUser);            
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your account!")
    }
});

//DELETE USER & POSTS
router.delete("/:id", async(req,res)=>{ 
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                //delete alls post where username in post table is same as username of the above user object 
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id)   
                res.status(200).json("User has been deleted...");  
            }catch(err){
                res.status(500).json(err);
            }

        }catch(err){
            res.status(404).json("User not found");
        }
    }else{
        res.status(401).json("You can delete only your account!")
    }
});

//GET USER
router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(404).json("User not found");
    }
});

module.exports = router



/*  update existing data in model: use PUT hhtp method
    create new data in model: use POST http method
    delete data on model : use DELERE http method
    fetching data from model (no change, no updata data): use GET method
*/
/**
 * req stands for request we send to our server. EX: when we careate a user, we send request with username, passwrok,email,etc to out server.
 * res stands for response which is returned after sending the request. It can be a warning or any string you can just say like " successfelly created new user." 
 */
 //use async function because there are many processes(coonect database, update database, return respond,..) take place at once