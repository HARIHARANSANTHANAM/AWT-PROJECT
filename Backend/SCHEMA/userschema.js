const mongoose=require('mongoose');
const schema=mongoose.Schema;

const users=new schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    Followers:[{type:schema.Types.ObjectId,
        ref:'User'}]
    ,
    Following:[{type:schema.Types.ObjectId,
        ref:'User'}]
})

const account=mongoose.model("User",users);

module.exports=account;