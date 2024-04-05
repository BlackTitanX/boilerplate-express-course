let express = require('express');
let app = express();
let bodyParser = require('body-parser'); 

require('dotenv').config() 

const logger = (req, res, next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);

 next();
}



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
  res.json({"echo": req.params.word});

})

app.get("/name",(req,res)=>{
  res.json({"name": req.query.first + " " + req.query.last});

})

app.post("/name",(req,res)=>{
  res.json({"name": req.body.first + " " + req.body.last});

})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});































 module.exports = app;
