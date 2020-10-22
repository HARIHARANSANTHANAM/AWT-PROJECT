
const account=require('../Model/userschema');
const bcrypt=require('bcryptjs');
const User_Signup=(req,res)=>{
    (req,res)=>{
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
    
    }
}




const User_Signin=(req,res)=>{
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
    
}



const User_getProfile=(req,res)=>{
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
    
  }


module.exports={User_Signup,User_Signin,User_getProfile}