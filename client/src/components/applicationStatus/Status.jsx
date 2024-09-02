import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './status.css'
import { toast, ToastContainer } from 'react-toastify';

function Status() {
  const[application,setApplication]=useState([]);
  // const [branch,setBranch]=useState('');
  const[brId,setBrandId]=useState(null);
  const[brName,setBrName]=useState(null);
  const[brCity,setBrCity]=useState(null);
  const[pincode,setPin]=useState(null);
  const[userId,setUserId]=useState(null);
  const navigate=useNavigate()
  useEffect(()=>{
    
    const user=JSON.parse(localStorage.getItem('currentUser'))
    console.log("user",user)

    if(user===null){
      
      toast("Please Login ..")
      alert("PleaseLogin")
      navigate('/')
      
    }
    else{
    setUserId(user.currentUser.UserID)
    }
},[])

  // const user=JSON.parse(localStorage.getItem('currentUser'))
  // const userId=user.currentUser.UserID

  console.log(userId)
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/users/applicationStatus/${userId}`,{withCredentials:true})
    .then(res=>{
      console.log("Applications :",res.data)
      setApplication(res.data.result)
      setBrandId(res.data.result[0].BranchID)
    })
    .catch(err=>{
      console.log(err)
    })
  },[userId])
  console.log("branchID",brId)
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/branch/branchById/${brId}`)
    .then(res=>{
      console.log("Branch Name:",res.data.result)
      setBrName(res.data.result[0].Name)
      setBrCity(res.data.result[0].City)
      setPin(res.data.result[0].PinCode)
    })
    .catch(err=>{
      console.log(err)
    })
  },[brId])

  return (
    <div className='card cardst'>
       
       {
        application.length > 0 ? (
          application.map((app) => (
            <div key={app.id}>
              <h5>Name: {app.FirstName} {app.LastName}</h5>
              <p>Branch: {brName}, {brCity}, {pincode}</p>
              <p>Your Application Status: {app.Verified === 0 ? <span>Pending</span> : <span>Accepted</span>}</p>
            </div>
          ))
        ) : (
          <div className='message'>
            <h4>You have not applied yet.</h4>
          </div>
        )
      }
      
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default Status
