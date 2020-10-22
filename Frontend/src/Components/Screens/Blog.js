import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
function Blog() {
    const [Blog, setBlog] = useState([])
    const [user,setuser]=useState("");
   const History=useHistory()
 useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('User'))?JSON.parse(localStorage.getItem('User'))._id:History.push('/Login'))
        fetch('/getBlog')
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
            const msg=data;
            setBlog(data.blogs.map(blog=>blog.Writer._id===JSON.parse(localStorage.getItem('User'))._id?blog:""))
           //setBlog(data.blogs)
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
            toast.error("Internal Server Error",{
            });
          });
         
    }, [])
   const handledeleteBlog=(blogid=>{
    if(window.confirm("Do you want to Delete The Blog?")){
    fetch('/Blog',{
        method:"delete",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
    _id:blogid
    })})
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const msg=data;
     // setBlog(data.blogs.map(blog=>blog.Writer._id===JSON.parse(localStorage.getItem('User'))._id?blog:""))
     //setBlog(data.blogs)
     console.log(data.blogs)
     window.location.reload()
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
      toast.error("Internal Server Error",{
      });
    });
}
   })

    return (
        <div>
            <Navbar/>
            <br></br>
            <div className="row" style={{ margin: 0 }}>
                
                {
                    Blog.map((blog)=>{

                       return (blog?<div className="col-12 col-md-3 col-lg-3 col-xl-3 " style={{paddingBottom:"15px"}}>
                        <div className="card shadow p-3 mb-5" >
                            
                            <div style={{height:150,overflowY:"auto",overflowX:"hidden",position:"relative"}} className="card-img">
                                <div style={{width:"100%",position:"absolute"}} dangerouslySetInnerHTML={{__html: blog.Content}}/>
                            </div>
                            <div className="card-body text-left">
                                <h4 className="text-secondary" style={{ fontFamily: "sans-serif",width:"100%",textOverflow: "ellipsis",whiteSpace: "nowrap",overflow:"hidden" }}>Title:{blog.Title?blog.Title:"My First Blog"}</h4>
    
                    <h6 className="text-secondary" style={{ fontFamily: "sans-serif", fontSize: "13px" }}>Created:{blog.createdAt},Community:Food</h6>
                            </div>
                            <div className="card-footer">
                                <div className="row" style={{ margin: 0 }}>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        <Link to={`/BlogPage/${blog._id}`}><button className="btn "><i class="fa fa-code" aria-hidden="true"></i></button></Link> 
                                    </div>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        <button className="btn "><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        <button onClick={(e)=>handledeleteBlog(`${blog._id}`)} className="btn "> <i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        :"")
                    })
                }
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Blog
