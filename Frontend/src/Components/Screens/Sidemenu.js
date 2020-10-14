import React from 'react'
import {Link} from 'react-router-dom';

//import home from '../../styles/Home.module.css';
function Sidemenu(props) {
    return (
                            <div style={{ position: "sticky", top: "20%" }}>

                        <div style={{display:"flex"}}>
  <Link className="navbar-brand " style={{display:"flex"}} to="/Home">
{props.Email?<div></div>:<img src={require('../../assets/John-Wick-carousel.jpg')} width="30" height="30" style={{borderRadius:"50%"}}alt=""/>}
 &nbsp; <h6 style={{margin:"3px 0px"}}>{props.email}</h6>
</Link>
  </div>
                        <ul className="navbar-nav" style={{ textAlign: "left" }}>

                            <li className="nav-item active" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Home" style={{ color: "black" }}><i class="fa fa-home" style={{fontSize:"18px"}}aria-hidden="true"></i>&nbsp;&nbsp; Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Createpost" style={{ color: "black" }}><i class="fa fa-pencil" style={{fontSize:"18px"}}aria-hidden="true"></i>&nbsp;&nbsp;Createpost</Link>
                            </li>
                            <li className="nav-item" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Blog" style={{ color: "black" }}><i class="fa fa-th-large" style={{fontSize:"18px"}}aria-hidden="true"></i>&nbsp;&nbsp;Blog</Link>
                            </li>
                            <li className="nav-item" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Login" style={{ color: "black" }}><i class="fa fa-sign-in" style={{fontSize:"18px"}}aria-hidden="true"></i>&nbsp;&nbsp;Signin</Link>
                            </li>
                            <li className="nav-item" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Signup" style={{ color: "black" }}><i class="fa fa-user-plus"style={{fontSize:"18px"}} aria-hidden="true"></i>&nbsp;&nbsp;Signup</Link>
                            </li>
                            <li className="nav-item" style={{ padding: "0px 20px" }}>
                                <Link className="nav-link" to="/Signup" style={{ color: "black" }}><i class="fa fa-sign-out"style={{fontSize:"18px"}} aria-hidden="true"></i>&nbsp;&nbsp;Logout</Link>
                            </li>
                        </ul>
                    </div>
                    
    )
}

export default Sidemenu
