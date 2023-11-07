const mongoose=require("mongoose");
const {Schema}=mongoose
const {Types}=Schema
const {String,Number,Date}=Types

const fitschema=new Schema({
    user:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    messages:[{

        activity:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        }, 
        duration:{
            type:Number,
            require:true
        },
        date:{
            type:String,
            require:true
        },
}]

})

fitschema.methods.createmessage=async function(activity,email,duration,date){
    this.messages=this.messages.concat({activity,email,duration,date})
    this.save();
}

const Fitmodel=mongoose.model("Fitmodel",fitschema);

module.exports=Fitmodel;
