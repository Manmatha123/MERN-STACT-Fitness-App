const express = require("express");
const Route = express.Router();
const Fitmodel = require("../model/fitnessmodel");
const multer = require("multer");
const { isObjectIdOrHexString } = require("mongoose");
// const serverimg=require("../serverimage")
Route.get("/", (req, res) => {
    res.send("home page");
})


// let storage=multer.diskStorage({
//     destination:"../serverimage",
//     filename:function (req,file,cb){
//        cb(null,file.originalname)
//     }
// })
// let upludeimg=multer({storage:storage})

Route.post("/create", async (req, res) => {
    try {
        const { email, user } = req.body;
        if (!email || !user) {
            return res.status(400).json({ "message": "Invalid Create User Data" })
        }

const isExixtUser=await Fitmodel.findOne({email})
if(isExixtUser){
    return res.status(404).json({ "message": "Email already exist" })
}

        const databaseuser = await Fitmodel({
            "email": email,
            "user": user,
        })
        const savedata = await databaseuser.save();
        res.status(201).json({ "message": "success create" })
    }
    catch (err) {
        console.log("error")
    }
})

// eneter details of the user

Route.post("/details", async (req, res) => {
    try {
        const { user, email, duration, date,activity } = req.body;
        if (!email || !user || !duration || !date || !activity) {
            return res.status(400).json({ "message": "Invalid Create User Data" })
        }

        const userfind = await Fitmodel.findOne({email,user});
        if (!userfind) {
            return res.status(400).json({ "message": "Invalid User" })
        }

        const usermessage=await userfind.createmessage(activity,email,duration,date);

        res.status(201).json({ "message": "success create" })

        
    }
    catch (err) {
        console.log("error")
    }
})


// dashboard data

Route.get("/dashboard",async (req,res)=>{
    const datadash=await Fitmodel.find();
    res.send(datadash);
})
// delete component message

Route.post("/delete",async (req,res)=>{
const {id}=req.body;
if(!id){
    return res.status(400).json({ "message": "Fail to delete User data" })
}
const datadash=await Fitmodel.updateMany({messages:{$elemMatch:{_id:id}}}, {$pull:{messages:{_id:id}}});
res.status(201).json({ "message": "successfully deleted" })


})

module.exports = Route;