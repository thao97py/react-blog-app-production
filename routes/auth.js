////url to register for new users and login 
const router = require("express").Router(); //import Rour=ter object of express framework
const User = require("../models/User"); //impoer User model
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register", async(req,res)=>{ 
    try{
        const existedUser = await User.findOne({username:req.body.username});
        const existedEmail = await User.findOne({email:req.body.email});
        if(existedUser){
            res.status(400).json("Username already exists!");
        }else if(existedEmail){
            res.status(400).json("There already exists a user account registered with the same email!");
        }
            else{
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password,salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
            })
            const user = await newUser.save();
            res.status(200).json(user);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        //if user is not found in database
        !user&&res.status(400).json("Username is not found!");
        
        //validate password
        const validated = await bcrypt.compare(req.body.password,user.password);
        !validated && res.status(400).json("Wrong password!");
        
        //move password property from the return json of response
        const{password, ...others} = user._doc; 
        /**
         * The above is equivelant to 
         *  password = user.password
         *  other_properites_of_user = user._doc
         */
        res.status(200).json(others);//return everything except password properties
        
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