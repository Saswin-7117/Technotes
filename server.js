const express = require("express");
const path = require("path");
const app=express();
const {logger} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const port =  3500;


app.use(logger);
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/',require('./routes/root'));

app.all('/*',(req,res)=>{
    if(req.accepts('json')){
        res.sendFile(path.join(__dirname,"views","404.html"));
    }
})

app.use(errorHandler);

app.listen(port ,()=>console.log("Listening on port 3500"));