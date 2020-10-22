const express=require('express');
const Router=express.Router();
const {Blog_Creation,Blog_Deletion,View_Blog,Blog_Details,Comment_Blog}=require('../Controller/blogcontroller');


Router.post('/CreateBlog',Blog_Creation)
Router.delete('/Blog',Blog_Deletion)
Router.get('/getBlog',View_Blog)
Router.post('/getBlogDetails',Blog_Details)
Router.put('/comment',Comment_Blog)
 



module.exports=Router;