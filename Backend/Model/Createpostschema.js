const mongoose=require('mongoose');
const schema=mongoose.Schema;

const blog=new schema({
    Title:{
        type:String,
        required:true
    },
    Content:{
        type:String,
        required:true
    },
    Writer:{
        type:schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[{
        text:String,
        PostedBy:{type:schema.Types.ObjectId,
        ref:'User'}}]
},{timestamps:true})

const Blog=mongoose.model("Blog",blog);

module.exports=Blog;