var expr = require('express')
app = expr()
multer = require("multer")
var fs = require('fs')

// app.use(expr.static('./Express',{index:'index.html'}))


var store = multer.diskStorage({

    destination:"Myfolder", 
    
    filename:(req, file, cb)=> { 
    
    cb(null, file.originalname) 
    
}}) 

var upload = multer({storage:store}).single('mypic')
app.post('/uploadFile',upload,(req,res)=>{
    if(req.file){

        res.send(`<h1>File <span style=color:green;>${req.file.originalname}</span> has been uploaded in <span style=color:green;>${req.file.destination}</h1>`)
    }
})

app.listen(8080,()=>{
    console.log(`Launch App http://localhost:${8080}`);
    
})