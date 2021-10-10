const router = require("express").Router(); //import Rourter object of express framework
const Category = require("../models/Category"); //import Category model which is defined in /models/Category.js

//CREATE A CATEGORY
router.post("/", async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL EXISTING CATEGORIES
router.get("/", async(req,res)=>{
    try{
        const existingCats = await Category.find();
        res.status(200).json(existingCats);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports= router;