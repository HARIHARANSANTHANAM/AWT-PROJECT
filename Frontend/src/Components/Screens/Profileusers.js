import React,{useEffect,useState} from 'react'
import {NavLink,Link, useHistory}from 'react-router-dom';
import Navbar from './Navbar';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profileusers(props) {
    
    const [Blog, setBlog] = useState([])
    const History=useHistory();
    console.log(props.match.params.id)
    const [user,setuser]=useState("");
    const [BlogDetail, setBlogDetail] = useState({})
    useEffect(() => {
     fetch('/getProfile' ,{
         method:"post",
     headers:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify({
     userid:props.match.params.id
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
     setuser(JSON.parse(localStorage.getItem('User'))?JSON.parse(localStorage.getItem('User'))._id:History.push('/Login'))
     fetch('/getBlog')
       .then(res=>res.json())
       .then(data=>{
         console.log(data);
         const msg=data;
        setBlog(data.blogs.filter((blog,i)=>{return blog.Writer._id===props.match.params.id}))
        console.log(data.blogs.filter((blog,i)=>{return blog.Writer._id===props.match.params.id}))
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

    const handleFollow=(e)=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"apllication/json"
            },
            body:JSON.stringify({
                followid:props.match.params.id,
                user_id:JSON.parse(localStorage.getItem('User'))._id
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
        }).catch(e=>console.log(e))
    }
    
    return (
        <>
        {
            JSON.parse(localStorage.getItem('User'))._id===props.match.params.id
            ?History.push('/Home')
            :
            <>
            <Navbar/>
            <div className="container ">
                
            <div className="row container" style={{ margin: 0 }}>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 " style={{paddingBottom:"15px"}}>
            <br></br>
            <NavLink className="navbar-brand " to="/Profile">
    {<img src={require('../../assets/John-Wick-carousel.jpg')} width="200" height="200" style={{borderRadius:"50%"}}alt=""/>}
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
                    
                    <button className="btn btn-primary ml-5 " style={{width:"200px"}} onClick={handleFollow}>FOLLOW</button>
                </div>
            </div>
            
</div>
<div className="row" style={{ margin: 0 }}>
                
                {
                    Blog.map((blog)=>{

                       return (blog?<div className="col-12 col-md-3 col-lg-3 col-xl-3 shadow p-3 mb-5" style={{paddingBottom:"15px"}}>
                        <div className="card" >
                         
                            <div style={{height:250,overflowY:"auto",overflow:"hidden",position:"relative"}} className="card-img">
                            <Link to={`/BlogPage/${blog._id}`}>
                                <div style={{width:"100%",position:"absolute"}} dangerouslySetInnerHTML={{__html: blog.Content}}/>
                                </Link>
                            </div>
                            </div>
                        </div>
                        :"")
                    })
                }
           </div>
            </div>
            
            <ToastContainer/>
</>
        }
                </>
    )
}

export default Profileusers
