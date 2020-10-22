
const Blog=require('../Model/Createpostschema')

const Blog_Creation=(req,res)=>{
    var blog=req.body;
console.log(blog)
const Newblog=new Blog(req.body)    
Newblog.save(err=>{
if(err)
{
console.log(err);
  
console.log("CreateBlog Page Loaded");
res.send(JSON.stringify({"error":"Some Internal Error In Server"
,"success":"CreateBlog Page Loaded","user":Newblog}));
}
});
}

const Blog_Deletion=(req,res)=>{
    var blog=req.body;
console.log(blog)
    
Blog.deleteOne({
id:blog._id
}).then(result=>{
console.log(result)
res.send(JSON.stringify({"error":"",
"success":"Blog is removed Successfully"}))
})
.catch(e=>{
console.error(error)
})
}


const View_Blog=(req,res)=>{
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

}

const Blog_Details=(req,res)=>{
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
 
}


const Comment_Blog=(req,res)=>{
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
}

module.exports={
    Blog_Creation,
    Blog_Deletion,
    View_Blog,
    Blog_Details,
    Comment_Blog
}