import express from "express";

const app = express();

const logger = (req, res, next) =>{
        console.log(req.url)
        console.log(req.method)
        console.log(Date())
        next();
}       

const newMiddleware = (req, res, next) =>{
    console.log("hello")
    next();
}

app.use(logger);//throughout the app

app.get("/" , newMiddleware, logger, (req, res) =>{//fix te repetition noneed for logger
    
    console.log(req.url)
    console.log(req.method)
    console.log(Date())
    //?
    //?
    res.send("welcome t the server")
});
app.get("/about" , (req, res) =>{
    console.log(req.url)
    console.log(req.method)
    console.log(Date())
    //?
    //?
    res.send("welcome t about")
});
app.get("/data" , (req, res) =>{
    console.log(req.url)
    console.log(req.method)
    console.log(Date())
    //?
    //?
    res.send("welcome t daata")
});

app.listen(3000)