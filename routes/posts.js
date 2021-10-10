//url to create, upate or delete posts in blog app

const router = require("express").Router(); //import Rourter object of express framework
const User = require("../models/User"); //import User model
const Post = require("../models/Post"); //import Post model, which is defined in /models/Post.js
const { deleteModel } = require("mongoose");
const { route } = require("./auth");



//CREATE A POST
router.post("/", async(req,res)=>{ 
    const newPost = new Post(req.body);  //create of new object for Post model
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:post_id", async(req,res)=>{ 
    try{
        const post = await Post.findById(req.params.post_id);
            if(post.username === req.body.username){
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.post_id,{$set:req.body},{new:true});
                    res.status(200).json(updatedPost);
                }catch(err){
                    res.status(500).json(err);
                }
            }else{
                res.status(401).json("You can update your post only!");
            }
        
    }catch(err){
        res.status(400).json("Post not found");
    }
});

//DELETE POST
router.delete("/:post_id", async(req,res)=>{ 
    try{
        const post = await Post.findById(req.params.post_id);
            console.log("post.username***: "+post.username);
            console.log("req.body.username***: "+req.body.username);
            if(post.username === req.body.username){
                try{
                   await post.delete();
                    res.status(200).json("Post has been deleted.");
                }catch(err){
                    res.status(500).json(err);
                }
            }else{
                res.status(401).json("You can delete your post only!");
            }
        
    }catch(err){
        res.status(400).json("Post not found");
    }
});

//GET POST
router.get("/:post_id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        res.status(200).json(post);
    }catch(err){
        res.status(404).json("Post not found");
    }
});

//GET ALL POSTS 
router.get("/", async(req,res) =>{
    //query is dynamic parameters we can add in the url. For ex: /?user=thao, /?cat=life, or /?cat=music&user=thao
    const username = req.query.user; //get value assigned to variable user in url after ?
    const catName = req.query.cat; //get value assigned to variable cat in url after ?
    try{
        let posts;
        if(username && catName){
            //find all posts of that user name
            posts=await Post.find({username:username,categories:{$in:[catName]} });
        }else if(username){
            //find all posts of that user name
            posts=await Post.find({username:username});
        }else if (catName){
            //find all post (regardless which user owns the post) that has catName inside categories array
            posts = await Post.find({categories:{$in:[catName]}});
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
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