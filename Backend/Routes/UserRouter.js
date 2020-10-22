const express=require('express');
const Router=express.Router();
const {User_Signup,User_Signin,User_getProfile}=require('../Controller/usercontroller')

Router.post('/Signup',User_Signup)
Router.post('/Signin',User_Signin) 
Router.post('/getProfile',User_getProfile)

module.exports=Router;