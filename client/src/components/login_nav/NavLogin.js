import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './navlogin.css'
import axios from 'axios'
function NavLogin() {
const [status,setStatus]=useState(false);
// const userId = useSelector((state) => state.auth.user.userId);
// console.log("from redux:",userId)
// const [id,setId]=useState("");

const[user,setUser]=useState(
  {ID: '',
  UserID: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Phone: '',
  Address: ''}
);
 useEffect(()=>{
  const user=JSON.parse(localStorage.getItem('currentUser'))
  console.log("customerdetails",user)
   setUser(user?.currentUser)
   if(user===null){
    setStatus(false)
   }else{
    setStatus(true)
   }

 },[])
 
  const handleLogout=()=>{

  localStorage.removeItem('currentUser');
  
  axios.get(`http://localhost:8000/api/auth/logout`,{ withCredentials: true })
  .then(
    res=>{console.log(res)
      setStatus(!res.data.Status);
      navigate('/')
    }
  )
  .catch(
    error=>{console.log(error)}
  )

 }
 const navigate =useNavigate();
  const handleLogo=()=>{
    navigate('/')
  }

  return (
    <div className='nlcontainer'>
    <div className='nav'>
        <div className='logo' 
        onClick={()=>handleLogo()}
    >
            <h3>SalonSync Solution</h3>
        </div>
        <div className='button'>
            {/* {user.user.data&&user.user.data.Email?<p style={{ color: 'red' }}>{user.user.data.Email}</p>:( */}
              <div>
              {
                status?(
                  <div className='loginContent'>
                    <p>{user&&user.FirstName+" "+user.LastName}</p>
                  <button onClick={()=>handleLogout()} >Logout</button>
                </div>

                ):(                <> 
                  <button> <Link to={"/login"}>Login</Link>   </button>
                   <button><Link to={"/register"}>Register</Link>   </button>
                </>
                )
              }
                
                
        
              </div>
            {/* )} */}
           
           
        </div>
    </div>
    </div>
  )
}

export default NavLogin