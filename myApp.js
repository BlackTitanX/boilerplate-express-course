let express = require('express');
let app = express();
require('dotenv').config() 

const logger = (req, res, next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);

 next();
}




app.use("/public", express.static(__dirname + "/public"));
app.use(logger);

app.get("/",(req,res)=>{
 res.sendFile(__dirname+"/views/index.html")
})


app.get("/json",(req,res)=>{
 if(process.env.MESSAGE_STYLE === "uppercase"){
 res.json({"message": "HELLO JSON"});
 }else{
  res.json({"message": "Hello json"});
 }
})

app.get("/:word/echo",(req,res)=>{
 const word = req.params.word;
  res.json({"echo": word});

})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});































 module.exports = app;
