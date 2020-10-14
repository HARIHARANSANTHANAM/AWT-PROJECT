import React,{useEffect,useState} from 'react'

import Navbar from './Navbar';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BlogPage(props) {
    const [BlogDetail, setBlogDetail] = useState({})
   useEffect(() => {
    fetch('/getBlogDetails' ,{
        method:"post",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
    id:props.match.params.id
    })})
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const msg=data;
     setBlogDetail(data.blogs)
     console.log(data.blogs)
      if(msg.success)
      {
        toast.success(msg.success,{
        });
      }
      else{
        toast.error(msg.error,{
        });
      }
    })
    .catch(e=>{
      console.log(e);
    });

   }, [])
    return (
        <div >
          <Navbar/>
            <br></br>     
            <div className="row" style={{ margin: "0" }}>
                <div className="col-12 col-xl-3" ></div> 
                <div className="col-12 col-xl-6" >
    <h1>Title : {BlogDetail.Title}</h1>
    <h6 className="text-gray">Created:{BlogDetail.createdAt}</h6>
    
    <div  style={{textAlign:"left",overflowX:"hidden"}}>
        {<div  dangerouslySetInnerHTML={{__html: BlogDetail.Content}}/>}
        </div>
  </div>
  <div className="col-12 col-xl-3" ></div> 
        <ToastContainer/>
        </div>
        </div>
    )
}

export default BlogPage
