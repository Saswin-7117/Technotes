const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs= require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async(mesg,logFilename)=>{
    const dateTime = format(new Date(),"yyyy-MM-dd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${mesg}\n`;

    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFilename),logItem,'utf-8');
    }
    catch(err){
        console.log (err);
    }
}

const logger = (req,res,next) =>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log');
    console.log(`${req.method}\t${req.url}`);
    next();
}

module.exports={logEvents,logger};