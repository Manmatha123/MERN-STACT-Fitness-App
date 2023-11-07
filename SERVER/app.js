require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT;
const Route=require("./Routes/route");
const cors=require("cors");
require("./db/fitnessdata");


app.use(cors({
    origin:"*"
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(Route);



app.listen(PORT,()=>{
    console.log("listening to server");
})