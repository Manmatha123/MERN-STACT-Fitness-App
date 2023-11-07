const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/merndatabase2")
.then(()=>{
    console.log("Successfully connected to Mongo db server");
})
.catch((err)=>{
    console.log(err);
})