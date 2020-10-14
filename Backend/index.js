const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const bcrypt=require('bcryptjs');
const app=express();
const account=require('./SCHEMA/userschema');
const Blog=require('./SCHEMA/Createpostschema')
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


app.post('/Signup', (req,res)=>{
  var user=req.body;
  const {Username,Password,Email,DOB}=user;
  try{
    var salt = bcrypt.genSaltSync(14);
    var hashedPassword = bcrypt.hashSync(Password, salt);
     account.findOne({Email},(err,user)=>{
      if(user)
      {
         res.send(JSON.stringify({"error":"User Already Exists","success":""}));
      }
      else{
        const newuser=new account({
          Username,
          Password:hashedPassword,
          Email,
          DOB
        }) 
        newuser.save(err=>{
          if(err){
           console.log(err);
   
           console.log("User Added Successfully");
            res.send(JSON.stringify({"error":"","success":"User Added Successfully","user":user}));
          }
        });
      }
      
    })
  
    
    }
  
  catch(e)
  {
    console.log(e)
    res.send(JSON.stringify({"error":"User Is not Added Successfully","success":""}));
  }

})



app.post('/Signin', (req,res)=>{
  var {Username,Password}=req.body;
  var user=req.body;
  console.log(user);
  if(user.Username=="" || user.Password=="")
  {
   return   res.send(JSON.stringify({"error":"Please Add All the Fields","success":""}));
  }
  else{
   
   account.findOne({Email:Username},(err,user)=>{
    if(user)
    {
        bcrypt.compare(Password,user.Password,(err,response)=>{
          if(response==true)
          {
            return res.send(JSON.stringify({"error":"","success":"Logged In","user":user}));
          }
          else{
            return res.send(JSON.stringify({"error":"Invalid Username Or Password","success":""}))
          }
        })
       
    }
  })
  }
  
})


app.post('/CreateBlog',(req,res)=>{
  var blog=req.body;
  console.log(blog)
  const Newblog=new Blog(req.body)
  
  
  Newblog.save(err=>{
    if(err){
     console.log(err);

     console.log("CreateBlog Page Loaded");
     res.send(JSON.stringify({"error":"Some Internal Error In Server","success":"CreateBlog Page Loaded","user":Newblog}));
    }
  });
    })

    app.delete('/Blog',(req,res)=>{
      var blog=req.body;
      console.log(blog)
  
      Blog.deleteOne({
            _id:blog._id
        }).then(result=>{
          console.log(result)
               res.send(JSON.stringify({"error":"","success":"Blog is removed Successfully"}))
        })
        .catch(e=>{
          console.error(error)
        })
      })

app.post('/getProfile',(req,res)=>{
  const {userid}=req.body;
  account.findOne({_id:userid})
  .select('-Password')
  .exec((err,User)=>{
    if(err)
    {
       return res.status(500).send(JSON.stringify({"error":"Something Went Wrong Please Try Again","success":""}))
    }
    res.status(200).send(JSON.stringify({"error":"","success":" Profile is Fetched Successfully","User":User}))
  })
  
})

app.get('/getBlog',(req,res)=>{
  Blog.find()
  .populate('Writer')
  .populate("comments.PostedBy","_id Username")
  .exec((err,blog)=>{
    if(err)
    {
       return res.status(500).send(JSON.stringify({"error":"Something Went Wrong Please Try Again","success":""}))
    }
    res.status(200).send(JSON.stringify({"error":"","success":"Blogs Are Fetched Successfully","blogs":blog}))
  })
  
})

app.post('/getBlogDetails',(req,res)=>{
  const {id}=req.body;
  Blog.findOne({_id:id})
  .populate('Writer')
  .exec((err,blog)=>{
    if(err)
    {
       return res.status(500).send(JSON.stringify({"error":"Something Went Wrong Please Try Again","success":""}))
    }
    res.status(200).send(JSON.stringify({"error":"","success":"Blogs Are Fetched Successfully","blogs":blog}))
  })
  
})

app.put('/follow',(req,res)=>{
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

app.put('/comment',(req,res)=>{
  const comment={text:req.body.text,
  PostedBy:req.body.user_id}
  Blog.findByIdAndUpdate(req.body.blogid,{
    $push:{comments:comment}
  },{
    new:true
  })
  .populate("comments.PostedBy","_id Username")
  .exec((err,result)=>{
    if(err){
      return res.send(JSON.stringify({"error":err}))
    }
      res.send(JSON.stringify({"result":result}))
  })
})


app.get('/',(req,res)=>{
  res.send("Hello World")
  console.log("My server")
  console.log("Server Strated at Port:",{port})
}).listen({port});