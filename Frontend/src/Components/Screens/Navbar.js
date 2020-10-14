import React,{useState,useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import navbar from '../../styles/Navbar.module.css';
function Navbar() {
  const [Searchbox, setSearchbox] = useState("")
  const [Profilepic,setProfilepic]=useState("")
  const [Email,setEmail]=useState("")
  const History=useHistory()
  useEffect(() => {
    console.log("Hari")
      setProfilepic(localStorage.getItem("User")?'../../assets/John-Wick-carousel.jpg':"")
      setEmail(localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")).Email:"")
      console.log(Profilepic)
  }, [])

  const Logout=(e)=>{
    localStorage.removeItem("User")
    History.push('/Login')
  }
    return (
        <div style={{position:"sticky",top:"0",zIndex:"1000"}}>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark " >
  <NavLink className="navbar-brand " to="/Home">
<img src={require('../../assets/logo.png')} width="30" height="30" alt=""/>
 &nbsp; U'r Choice Blog
</NavLink>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav navbar-center " style={{position:"absolute",left:"50%",transform:"translatex(-50%)"}}>
      <li className="nav-item" style={{padding:"0px 20px"}}>
        <NavLink activeclassName={navbar.active} style={{fontSize:"18px"}} className="nav-link" to="/Home"><i class="fa fa-home" aria-hidden="true"></i> <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item" style={{padding:"0px 20px"}}>
        <NavLink activeclassName={navbar.active} className="nav-link" style={{fontSize:"18px"}} to="/Createpost"><i class="fa fa-pencil" aria-hidden="true"></i></NavLink>
      </li>
      <li className="nav-item" style={{padding:"0px 20px"}}>
        <NavLink activeclassName={navbar.active} style={{fontSize:"18px"}} className="nav-link"to="/Blog"><i class="fa fa-th-large" aria-hidden="true"></i></NavLink>
      </li>
        {localStorage.getItem("User")?<div></div>:<><li className="nav-item" style={{padding:"0px 20px"}}>
        <NavLink activeclassName={navbar.active} style={{fontSize:"18px"}} className="nav-link"to="/Login"><i class="fa fa-sign-in" aria-hidden="true"></i></NavLink>
      </li>
      <li className="nav-item" style={{padding:"0px 20px"}}>
        <NavLink activeclassName={navbar.active} className="nav-link"style={{fontSize:"18px"}} to="/Signup"><i class="fa fa-user-plus" aria-hidden="true"></i></NavLink>
      </li></>}
    </ul>
   
  </div>

  <div style={{display:"flex"}}>
  <NavLink className="navbar-brand " style={{display:"flex"}} to="/Profile">
    {Profilepic?<img src={require('../../assets/John-Wick-carousel.jpg')} width="30" height="30" style={{borderRadius:"50%"}}alt=""/>:<i width="30" style={{borderRadius:"0%",fontSize:"26px"}} height="30" class="fa fa-user-circle" aria-hidden="true"></i>}
    {/* &nbsp; {localStorage.getItem("User")?<h6 style={{margin:"3px 0px"}}>{JSON.parse(localStorage.getItem("User")).Email}</h6>:<h6></h6>} */}
    {Email?<h6 style={{margin:"5px 0px"}}>{Email}</h6>:""}
</NavLink>
{localStorage.getItem("User")?<button className="btn btn-danger" onClick={Logout}><i class="fa fa-sign-out" aria-hidden="true" ></i>Logout</button>:<button className="btn btn-success" onClick={(e)=>{History.push('/Login')}}><i class="fa fa-sign-in" aria-hidden="true"></i>Signin</button>}
  </div>
</nav>
        </div>
    )
}

export default Navbar
