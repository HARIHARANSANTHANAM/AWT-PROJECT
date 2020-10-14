import React,{useState,useEffect} from 'react'
import {useHistory,Link} from 'react-router-dom'

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'
import {NavLink} from 'react-router-dom';
function Profile() {
    const [Blog, setBlog] = useState([{}])
    const [user,setuser]=useState("");
   const History=useHistory()
 useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('User'))?JSON.parse(localStorage.getItem('User'))._id:History.push('/Login'))
    const condition=navigator.onLine?true:false
    console.log(condition)
    condition?
        fetch('/getBlog')
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
            const msg=data;
            setBlog(data.blogs.filter((blog)=>{return blog.Writer._id===JSON.parse(localStorage.getItem('User'))._id}))
           //setBlog(data.blogs)
           console.log(Blog)
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
          }):toast.error("You Are Offline",{})
         
    }, [])
    
    return (
        <div>
            <Navbar/>
            <div className="container ">
                
            <div className="row container" style={{ margin: 0 }}>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 " style={{paddingBottom:"15px"}}>
            <br></br>
            <NavLink className="navbar-brand " to="/Profile">
    {<img src={require('../../assets/John-Wick-carousel.jpg')} width="200" height="200" style={{borderRadius:"50%"}}alt=""/>}
    {/* &nbsp; {localStorage.getItem("User")?<h6 style={{margin:"3px 0px"}}>{JSON.parse(localStorage.getItem("User")).Email}</h6>:<h6></h6>}
    {Email?<h6 style={{margin:"5px 0px"}}>{Email}</h6>:""} */}
</NavLink>
</div>
<div className="col-12 col-md-3 col-lg-3 col-xl-8 " style={{paddingBottom:"15px"}}>
    <br></br><br></br><br></br>
                <div class="container" style={{display:"flex"}}>
                    <div style={{paddingRight:"10px"}}>
                        <h5 style={{color:"grey"}}>Following</h5>
                        <h5>150K</h5>
                    </div>
                    <div style={{padding:"0px 10px"}}>
                        <h5 style={{color:"grey"}}>Followers</h5>
                        <h5>150K</h5>
                    </div>
                    
                    <div style={{padding:"0px 20px"}}>
                        <h5 style={{color:"grey"}}>Post</h5>
                         <h5>{Blog.length}</h5>
                    </div>
                </div>
                <br></br>
                <div style={{display:"flex"}} >
                    
                    <button className="btn btn-primary ml-5 " style={{width:"200px"}}><i class="fa fa-pencil" aria-hidden="true"></i> Edit Profile</button>
                </div>
            </div>
            
</div>
<div className="row" style={{ margin: 0 }}>
                
                {
                    Blog.map((blog)=>{

                       return (blog?<div className="col-12 col-md-3 col-lg-3 col-xl-3 shadow p-3 mb-5" style={{paddingBottom:"15px"}}>
                        <div className="card" >
                            {/* <div className="card-title">
                            <h4 className="text-secondary" style={{ fontFamily: "sans-serif" }}>{blog.Title?blog.Title:"My First Blog"}</h4>
                            </div> */}
                            <div style={{height:250,overflowY:"auto",overflow:"hidden",position:"relative"}} className="card-img">
                            <Link to={`/BlogPage/${blog._id}`}>
                                <div style={{width:"100%",position:"absolute"}} dangerouslySetInnerHTML={{__html: blog.Content}}/>
                                </Link>
                            </div>
                            
                                   
                                {/* <div className="row" style={{ margin: 0 }}>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        </div>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        <button className="btn "><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col-4 col-md-4 col-lg-4 col-xl-4" >
                                        <button className="btn "> <i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        :"")
                    })
                }
           </div>
            </div>
            
            <ToastContainer/>
        </div>
    )
}

export default Profile
