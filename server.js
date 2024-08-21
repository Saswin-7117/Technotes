const express = require("express");
const path = require("path");
const app=express();
const port =  3500;

app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/',require('./routes/root'));

app.all('/*',(req,res)=>{
    if(req.accepts('json')){
        res.sendFile(path.join(__dirname,"views","404.html"));
    }
})

app.listen(port ,()=>console.log("Listening on port 3500"));