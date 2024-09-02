import React, { useEffect, useState } from 'react'
import './myappointment.css'
import Navbar from '../navbar/Navbar'
import NavLogin from '../login_nav/NavLogin'
import Footer from '../footer/Footer'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BeatLoader} from "react-spinners";

function MyAppointment() {
    const[error,setError]=useState("");
    
  let [loading, setLoading] = useState(true);
    const [myAppointment,setMyAppointment]=useState([]);
    // const userId = useSelector((state) => state.auth.user.userId);
    const navigate=useNavigate();

    const [userId,setUserId]=useState(null);
  
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('currentUser'))
    console.log("user",user)
    if(user===null){
      alert("PleaseLogin")
      navigate('/login')
      
    }
    else{
        setUserId(user.currentUser.UserID)
    }
},[])
    console.log("sending id",userId)


    
    const [status,setStatus]=useState(false)
    // const user=JSON.parse(localStorage.getItem('currentUser'))
    // console.log("customerdetails",user)
    // const userId=user.currentUser.UserID
    
    useEffect(()=>{
        console.log("sending id useEffect",userId)
        if(userId){
            axios.get(`http://localhost:8000/api/user/users/myappointment/${userId}`, {
           withCredentials:true
            })
            .then(res=>{
                if(!res.data.Status){
                    setError(res.data.message);
                    console.log(res.data.message)
                    setLoading(false)
                }else{
                console.log("appointment from backend",res.data.result);
                setMyAppointment(res.data.result);
                console.log("my BookedAppointment",myAppointment.length);
                }})
            .catch(err=>{
                console.log(err);

            })
        }
    },[status,userId])
    const handleCancel=(ID)=>{
        console.log("appointemnt id",ID);
        axios.post(`http://localhost:8000/api/user/users/appointmentcancel/${ID}`)
        .then(res=>{
            console.log("response",res.data.Status);
            setStatus(!status);
            if(res.data.Status){
                toast.success("Cancelled successfully")
            }
            setLoading(false)
            // setMyAppointment(res.data.result);
            // console.log("my Appointment",myAppointment);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
        })
    }

  return (
    <div className='myapContainer'>
      
        <div className='appointmentList'>
            <div className='appointmentWrapper'>
            
            {error?(
                error,
                {/* <BeatLoader
                        loading={loading}
                        color='red'
                        /> */}
                        )
                :myAppointment.length===0?(
                <p>No Booked appointemnt</p>
            ):(
                <table className='table' border="1">
                <thead>
                    <tr>
                        <th>AppointmentID</th>
                        <th>Branch Name</th>
                        <th>Service Name</th>
                        <th>Booking Date</th>
                        <th>SlotTime</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myAppointment&&myAppointment.map(appointment=>(
                    <tr key={appointment.AppointmentID}>
                        <td>{appointment.AppointmentID}</td>
                        <td>{appointment.BranchName}, {appointment.BranchAddress}</td>
                        <td>{appointment.ServiceName}</td>
                        <td>{appointment.BookingDate}</td>
                        <td>{appointment.SlotTime}</td>
                        <td>{appointment.BookingStatus}</td>
                        <td>{"₹"+appointment.TotalPrice}</td>
                        <td>{appointment.PaymentMode}</td>
                        <td><button className='cancelbtn' onClick={()=>handleCancel(appointment.AppointmentID)}>Cancel</button>    </td>
                    </tr>
                    ))}

                 
                </tbody>
                </table>
            )}
            
               
            </div>

        </div>
        <ToastContainer/>
    </div>
  )
}

export default MyAppointment