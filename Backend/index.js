const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const app=express();
const account=require('./Model/userschema');
const blogRoutes=require('./Routes/BlogRouter');
const UserRouter=require('./Routes/UserRouter');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));
const connectionstring="mongodb+srv://Hariharan:pmrpHiB692L3XUFU@cluster0.kxkqd.mongodb.net/Blog?retryWrites=true&w=majority"; 
mongoose.connect(connectionstring,{useNewUrlParser:true, useUnifiedTopology: true ,useFindAndModify: false  })
.then(()=>{
  console.log("Connected Successfully To mongodb")
})
.catch(e=>{
  console.log(e);
})

const port=process.env.PORT | 10000;
console.log("The Baceknd Started at Port:",port);
app.get('/Home',(req,res)=>{
    res.end("Home Page Loaded");
})


app.put('/follow',(req,res)=>{
  console.log(req.body);
   account.findByIdAndUpdate(req.body.followid,{
       $push:{Followers:req.body.user_id}
   },{
     new:true
   },(err,result)=>{
     if(err)
      return res.send(JSON.stringify({error:err}))
      account.findByIdAndUpdate(req.body.user_id,{
        $push:{Following:req.body.followid}
      },{new:true})
      .then(result=>{
        res.send(JSON.stringify({"result":result}))
      }).catch(err=>{return res.send.json({error:err})})
   })
})

app.put('/unfollow',(req,res)=>{
  account.findByIdAndUpdate(req.body.followid,{
      $pull:{Followers:req.body.followid}
  },{
    new:true
  },(err,result)=>{
    if(err)
     return res.send.json({error:err})
     account.findByIdAndUpdate(req.body.followid,{
       $pull:{Following:req.body.followid}
     },{new:true}.then(result=>{
       res.json(result)
     }).catch(err=>{return res.send.json({error:err})}))
  })
})


app.use(blogRoutes)
app.use(UserRouter)

app.get('/',(req,res)=>{
  res.send("Hello World")
  console.log("My server")
  console.log("Server Strated at Port:",{port})
}).listen({port});