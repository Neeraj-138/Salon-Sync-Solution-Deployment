import React, { useState } from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
function Register() {
  const [value,setValue]=useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:"",
    Address:"",
    Password:""
  })
  const [error,setError]=useState('');
  // console.log(value);
  const navigate=useNavigate();
  const handleRegister=(e)=>{

    e.preventDefault();
    // console.log("registering");

    // console.log(value);
    axios.post("http://localhost:7000/api/auth/register",value)
    .then(
      res=>{
        // console.log(res.data.RegisterStatus);
        if(res.data.RegisterStatus)
        {   
          // toast.success("Registered Successfull",{position:toast.POSITION.TOP_RIGHT});
          alert("Registered Successfully ")

          navigate('/login')
        }
        else{
          setError(res.data.Message)
        }
      }
    )
    .catch(
      err=>{
        console.log(err);
      }
    )
  }
 
  return (
    <div className='logContainer'>
      <div className='RegWrapper'>
        {
          error&&error
        }
        <h3>Register here..</h3>
        <div className='inputf'>
          <input type='text' placeholder='FirstName' name='FistName' onChange={(e)=>setValue({...value,FirstName:e.target.value})} />
          <input type='text' placeholder='LastName'  name='LastName' onChange={(e)=>setValue({...value,LastName:e.target.value})}/>
          <input type='email' placeholder='Email'  name='Email' onChange={(e)=>setValue({...value,Email:e.target.value})}/>
          <input type='number' placeholder='Mobile Number' name='Phone' onChange={(e)=>setValue({...value,Phone:e.target.value})}/>
          <input type='text' placeholder='Address'  name='Address' onChange={(e)=>setValue({...value,Address:e.target.value})}/>
          <input type='password' placeholder='Password'  name='Password' onChange={(e)=>setValue({...value,Password:e.target.value})}/>
          <button onClick={(e)=>handleRegister(e)}>Register</button>
         </div>
         <div>
         <h5>Not Registered ?  
          <Link to={'/login'}>Click here to login</Link>
         </h5>   
         </div>
      </div>
        {/* <ToastContainer/> */}
    </div>
  )
}

export default Register