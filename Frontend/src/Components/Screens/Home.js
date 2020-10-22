 import React,{useState,useEffect} from 'react'
 import home from '../../styles/Home.module.css';
import Sidemenu from './Sidemenu.js';
import {useHistory,Link} from 'react-router-dom'
import Navbar from './Navbar';
import FilterResults from 'react-filter-search'
function Home() {
    const History=useHistory();
    const [user,setuser]=useState()
    const [searchuser,setseacrchuser]=useState("")
    const [data,setdata]=useState(["Jaga","Vinotha","Darani"])
    const [Blog, setBlog] = useState([])
    const [Comment,setComment]=useState("")
    const [FetchedComments,setFetchedComments]=useState([])
    const [Button, setButton] = useState("btn btn-danger disabled")
  const handleSearchChange=(e)=>{
    console.log(e.target.value)
    setseacrchuser(e.target.value)
    e.target.value?setButton("btn btn-danger"):setButton("btn btn-danger disabled")
  }
  useEffect(()=>{
      if(FetchedComments)
      {
     setuser(JSON.parse(localStorage.getItem('User'))?JSON.parse(localStorage.getItem('User'))._id:History.push('/Login'))
    fetch('/getBlog')
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        const msg=data;
        setBlog(data.blogs.reverse().map(blogs=>{return (blogs)}))
       console.log(data.blogs)
       
      })
      .catch(e=>{
        console.log(e);
      });
      }
    console.log(FetchedComments)
}, [])
const handlecommentText=(e)=>{
    console.log(e.target.value)
    setComment(e.target.value)
}


const comments=(text,blogid)=>{
   console.log(blogid+""+text);
    fetch('/comment',{
        method:"put",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
            text:Comment,
            user_id:user,
            blogid
        })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const msg=data;
      const newData=Blog.map(blog=>{
        
        console.log(blog)  
        return (  
            blog._id===msg.result._id?msg.result:blog
          )

      })
      setComment("")
      console.log(newData)
      setBlog(newData)
     //setBlog(data.blogs)
     console.log(Blog)
     
    })
    .catch(e=>{
      console.log(e);
    });
}
    return (
        user?
        <div>
            <Navbar></Navbar>
            <div className="row" style={{ margin: "0" }}>
                <div className="col-12 col-xl-3" >
                    <br></br>
                <div style={{display:"flex",position: "sticky", top: "12%"}}>
<input type="search" value={searchuser} onChange={handleSearchChange} placeholder="Search..."  style={{borderTopRightRadius:"0px",borderBottomRightRadius:"0px"}}className="form-control"></input>
<FilterResults value={searchuser} data={data} renderResults={results=>(<div>{results.map(el=>(<div><span>{el.name}</span></div>))}</div>)}/>
<button className={Button} style={{borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px"}}><i className="fa fa-search"></i></button>
</div>
                    <Sidemenu email={JSON.parse(localStorage.getItem("User"))!=null?JSON.parse(localStorage.getItem("User")).Email:""}></Sidemenu>
                </div>


                <div className="col-12 col-xl-6">
                    <br></br>
                    <div  style={{display:"flex",margin:"0px",padding:"10px",overflowX:"auto"}}>
                    {Blog?Blog.slice(0,4).map(blog=>{
                      return(
                          
                      <div className="shadow p-3 mb-5"style={{borderRadius:"8px",position:"relative",width:"180px",height:"230px",margin:"0px 15px",overflowX:"hidden"}}>
                      <div  style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",borderRadius:"8px",overflow:"hidden"}} >  
                        {<div dangerouslySetInnerHTML={{__html: blog.Content}} style={{width:"100%",height:"100%"}}/>}
                        </div>                      
                        </div>
                      )
                    }):<p>Loading....</p>
                }
                     
                    </div>
                    
                    <br></br>
                   
                    <div className="card shadow p-3 mb-5">
                        <a className="navbar-brand" href="/Home">
                            <img src={require('../../assets/logo.png')} width="80" height="80" alt="" />
                        </a>
                        <h4 className="text-secondary">Welcome To U'r Choice Blog</h4>
                        <h6 style={{ color: "grey" }} className="text-secondary">Share Your Personal With Us</h6>

                        <button className="btn btn-danger">Create a blog</button>

                    </div>
                    <div className="card ">
                        <div className="card-header text-left">
                            <a className="navbar-brand text-secondary" href="/Home">
                                <img src={require('../../assets/logo.png')} width="30" height="30" alt="" />
                            &nbsp;Food Community
                        </a>
                            <h6 className={home.timestamp}>Sep 12 2020 12:00 AM</h6>
                        </div>
                        <div className="card-body">
                            <img src={require('../../assets/logo.png')} width="100" height="100" alt="" />
                            <h6> F9 (alternatively known as Fast & Furious 9) is an upcoming American action film directed by Justin Lin and written by Daniel Casey. A sequel to 2017's The Fate of the Furious. Action Thrilling Movie
                        </h6>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger">Read More</button>
                        </div>
                    </div>
                    <br></br>
                    {
                        Blog.map(blog=>{
                            return(
                                <div className="card shadow p-3 mb-5" key={blog._id}>
                                <div >
                        <div className="card-header text-left">
                            <a className="navbar-brand text-secondary" href={`/Profileusers/${blog.Writer._id}`}>
                                <img src={require('../../assets/logo.png')} width="30" height="30" alt="" />
                            &nbsp;Posted By {blog.Writer._id===JSON.parse(localStorage.getItem('User'))._id?'You':blog.Writer.Username}
                        </a>
                            <h6 className={home.timestamp}>{new Date(blog.createdAt).toDateString()}</h6>
                        </div>
                        <div className="card-img" style={{height:300,overflowY:"auto",overflow:"hidden",margin:"10px 0px",position:"relative"}} >  
                        <div dangerouslySetInnerHTML={{__html: blog.Content}}/>
                        </div>
                        <div className="card-footer  bg-white">
                            
                        <Link className="ml-1"  to={`/BlogPage/${blog._id}`}><button className="btn btn-danger ">Read More</button></Link>
                            <br></br>
                            <form style={{display:"flex",padding:"10px"}} className="text-left" onSubmit={(e)=>{ e.preventDefault() 
                                comments(e.target[0].value,`${blog._id}`)}}>
                            <input type="text" className="col-12 " className="form-control" value={Comment}style={{borderTopRightRadius:"0px",borderBottomRightRadius:"0px"}} onChange={handlecommentText} placeholder="Comment Your Words..."/>
                            
                        <button className={Comment!=null?"btn btn-dark":"btn btn-dark disable"}  style={{borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px"}}><i class="fa fa-paper-plane" style={{borderRadius:"20px"}} aria-hidden="true"></i> </button>
                        </form>
                        {
                           blog.comments.slice(0,2).map(comments=>{
                                return(
                        <div style={{display:"flex"}} key={comments._id}>
                        <a className="navbar-brand text-secondary " href={`/Profileusers/${blog.Writer._id}`}>
                                <img src={require('../../assets/logo.png')} width="30" height="30" alt="" />
                                &nbsp;{comments.PostedBy._id===JSON.parse(localStorage.getItem('User'))._id?'You':comments.PostedBy.Username} : <small>{comments.text}</small>
                        </a>
                       
                        </div>
                                )
                            })
                        
                        }
                        </div>
                    </div>
                    
                    <br></br>
                    </div>
                    
                            )
                        }
                            )
                            
                    }
                   
                    
                </div>
                <div className="col col-sm-1 col-xl-3">
                    <br></br>
                    <div style={{ position: "sticky", top: "10%" }}>
                        <h4 className=" btn btn-danger w-100" style={{ cursor: "pointer", fontFamily: "sans-serif" }} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">Categories</h4>
                        <div className="collapse" id="collapseExample">
                            <div className={home.relative} >
                                <img src={require('../../assets/spider-man2.jpg')} className="card-img" alt="" height="50" />
                                <div className={home.centered}>Movies</div>
                            </div><br></br>
                            <div className={home.relative}>
                                <img src={require('../../assets/avengers3.jpg')} className="card-img" alt="" height="50" />
                                <div className={home.centered}>Games</div>
                            </div><br></br>
                            <div className={home.relative}>
                                <img src={require('../../assets/300.jpg')} className="card-img" alt="" height="50" />
                                <div className={home.centered}>Music</div>
                            </div>
                            <br></br>
                            <div className={home.relative}>
                                <img src={require('../../assets/john-wick-2-poster-gun.jpg')} className="card-img" alt="" height="50" />
                                <div className={home.centered}>Food</div>
                            </div>
                            <br></br>
                            <div className={home.relative}>
                                <img src={require('../../assets/spider-man2.jpg')} className="card-img" alt="" height="50" />
                                <div className={home.centered}>Fashion</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        :<div></div>
    )
}

export default Home
