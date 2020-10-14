import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Home from './Components/Screens/Home';
import Createpost from './Components/Screens/Createpost';
import Login from'./Components/Screens/Login';
import Signup from './Components/Screens/Signup';

import BlogPage from './Components/Screens/BlogPage';

import Profileusers from './Components/Screens/Profileusers';
import Profile from './Components/Screens/Profile';
import Blog from './Components/Screens/Blog';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  useEffect(() => {
    document.title="U'r Choice Blog"
  }, [])
  return (
    <>
    {
    navigator.onLine?
    <div className="App">
      <Router>
      <Switch>
      <Route exact path="/">
        <Home></Home>
      </Route>
     
      <Route exact path="/Home">
        <Home></Home>
      </Route>
      <Route path="/Createpost">
        <Createpost></Createpost>
      </Route>
      <Route path="/Login">
        <Login></Login>
      </Route>
      <Route path="/Signup">
        <Signup></Signup>
      </Route>
      <Route path="/Blog">
        <Blog></Blog>
      </Route>
      
      <Route path="/Profile">
        <Profile></Profile>
      </Route>
      <Route path="/BlogPage/:id"   component={BlogPage}>
        </Route>
        <Route path="/Profileusers/:id" component={Profileusers}>
          
        </Route>
        </Switch>
      </Router>
    </div>:toast.error("You are on Offline",{})
}         
            <ToastContainer/>
    </>
  );
}

export default App;
