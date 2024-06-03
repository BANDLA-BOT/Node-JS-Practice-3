const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const bcrypt = require('bcrypt')

const cors = require("cors");
const { urlencoded } = require("body-parser");

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors());




PORT = 8000;
const USER = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "username required"]
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
})
const userModel = mongoose.model('User', USER)



const dashboard = fs.readFileSync('./index.html', 'utf-8')


//CREATE
app.post('/users', async (req,res)=>{
    console.log(req.body.password)
    try {
        const user = await userModel.create({
            username: req.body.username,
            password:bcrypt.hashSync(req.body.password),
            email:req.body.email,
        })
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "error", error: " Duplicate email"})
        
    }
})
//LOGIN

app.post('/login',  async(req,res)=>{
    const user =await userModel.findOne({
        email:req.body.email,
        password:req.body.password,
    })
    if(user){
        res.json({status: 'okay',user:true})
    }
    else{
        res.json({status:'Error', user: false})
    }
})

mongoose
  .connect("mongodb://localhost:27017/CRUD")
  .then(() => {
    console.log("Connected to DB");
    //run server
    app.listen(PORT, () => {
      console.log("Server Running on " + PORT);
    });
  })
  .catch((err) => console.log(err));
