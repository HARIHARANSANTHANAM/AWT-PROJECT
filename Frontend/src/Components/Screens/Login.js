import React,{useState} from 'react'
import {toast,ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../../styles/Home.module.css';

import Navbar from './Navbar';
function Login() {
  const history=useHistory();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
  fetch('/Signin',{
    method:"post",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      Username:Username,
      Password:Password
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
      const User=JSON.stringify(msg.user);
      localStorage.setItem("User",User);
      history.push('/Home')
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

  const handleUsernameChange=(e)=>{
    console.log(e.target.value);
    setUsername(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    console.log(e.target.value)
    setPassword(e.target.value);
  }

  return (
        <div className={Home.background}>    
        <Navbar/>
           <div class="container">
        <br></br><br></br> 
        <div className="row">
        <div className="container col-xl-5 bg-dark jumbotron">
        <a className="navbar-brand" href="/Home">
<img src={require('../../assets/logo.png')} width="90" height="90" alt=""/>
</a>
<h4 className="text-white">U'r Choice Blog</h4>
            <form autocomplete="off">
                <div className="container">
          <div className="form-group container">
            <input type="text" value={Username} onChange={handleUsernameChange} className="form-control bg-white text-black" placeholder="Username" id="validationTooltipUsername"/>
            <div className="invalid-tooltip">
          Please choose a unique and valid username.
        </div>
          </div>
          <div className="form-group container">
           <input type="password" placeholder="Password" value={Password} onChange={handlePasswordChange}className="form-control bg-white text-black" id="pwd"/>
          </div>
          
          <div className="form-group container">
                        <input type="submit" onClick={handleSubmit}className=" form-control btn btn-success"value="Signin"></input>
                        </div>

          <br></br><br></br>
          <p className="text-white">Don't Have an Account?<a href="/signup">SiginUp</a></p>
          </div>
        </form>
        </div>
        </div>
        <ToastContainer/>
        </div>
         </div>
    )
}

export default Login
