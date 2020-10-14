import React,{useState,useEffect} from 'react';

import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import parser from 'react-html-parser'
function Createpost() {
  const [Title,setTitle]=useState("");
  const [Content,setblog]=useState("");
  
  const [user,setuser]=useState("");
 const History=useHistory()
  ClassicEditor.create(document.querySelector('#editor'),{
      image:{
          upload:{
              panel:{
                  items:['insertImageViaUrl']
              }
          }
      }
  })
  
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('User'))?JSON.parse(localStorage.getItem('User'))._id:History.push('/Login'))
  }, [])
  const handleSubmit= (e)=>{
    e.preventDefault();
    const Writer=JSON.parse(localStorage.getItem("User"))._id
      console.log(Writer)
   fetch('/CreateBlog',{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        Title,
       Content,
       Writer
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
       setTitle("")
       setblog("")
       History.push('/Blog');
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
    console.log(e.target.value)
    setTitle(e.target.value)
  }
    return (
        <div><Navbar/>
            <br></br>
            
        <div className="row " style={{ margin: "0" }}>
        
            <div className="col-12 col-xl-5 container">
              <h2 style={{textAlign:"left"}}>Title</h2>
            <input type="text" class="form-control" value={Title} onChange={handleUsernameChange} id="validationTooltip01" placeholder="Title..." required/>
  <br></br>
            <CKEditor
                    editor={ ClassicEditor }
                    data={Content}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log(data);
                        setblog(data);
                    } }
                />
               <br></br>
               <button className="btn btn-white shadow p-3 mb-5" onClick={handleSubmit}>Create Blog</button>
                </div>
            {/* <div className="col-12 col-xl-5 container" style={{position:"relative",border:"4px solid black"}}>
                <h1>Blog Preview </h1>
                  <p style={{textAlign:"left"}}>{Content}</p>
            </div> */}
        </div>
        <ToastContainer/>
       
        </div>
    )
}

export default Createpost
