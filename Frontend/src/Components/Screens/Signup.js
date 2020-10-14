import React,{useState} from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
function Signup() {
   const [Email, setEmail] = useState('');
   const [Password,setPassword]= useState('');
   const [Username,setUsername]= useState('');
   const [DOB,setDOB]= useState('');
   const handleUsernameChange=(e)=>{
    console.log(e.target.value);
    setUsername(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    console.log(e.target.value)
    setPassword(e.target.value);
  }

  const handleEmailChange=(e)=>{
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  const handleDOBChange=(e)=>{
    console.log(e.target.value)
    setDOB(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(Username+" "+Password+" "+" "+Email+" "+DOB);
    fetch('/Signup',{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        Username,
        Password,
        Email,
        DOB
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const msg=data;
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
  }
    return (
        <div>
          <Navbar/>
        <div class="container">
        <br></br>
        <div className="row">
        <div className="container col-xl-5 bg-dark jumbotron">
        <a className="navbar-brand" href="/Home">
<img src={require('../../assets/logo.png')} width="90" height="90" alt=""/>
</a>
<h4 className="text-white">U'r Choice Blog</h4>
            <form autocomplete="off">
                <div className="container">
                <div class="form-row">
    <div class="col-md-12 mb-3">
      <label for="validationTooltip01"></label>
      <input type="text" class="form-control" onChange={handleUsernameChange} id="validationTooltip01" placeholder="Username" required/>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>   
    </div>
          <div className="form-group ">
           <input type="password" placeholder="Password" onChange={handlePasswordChange} className="form-control bg-white text-black" id="pwd"/>
          </div>
          <div className="form-group ">
           <input type="email" placeholder="Email" onChange={handleEmailChange} className="form-control bg-white text-black" id="pwd"/>
          </div>
          <div className="form-group ">
           <input type="date" placeholder="Date Of Birth" onChange={handleDOBChange}className="form-control bg-white text-black" id="pwd"/>
          </div>
          
          <div className="form-group ">
                        <input type="submit" className=" form-control btn btn-success" onClick={handleSubmit} value="SignUp"></input>
                        </div>

          
          <p className="text-white">Already Have an Account?<a href="/Login">SignIn</a></p>
          </div>
        </form>
        </div>
        </div>
        </div>
        
        <ToastContainer/>
        </div>
    )
}



export default Signup
