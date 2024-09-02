import React, { useEffect, useState } from 'react'
import './myCancelAppointment.css'
import Navbar from '../navbar/Navbar'
import NavLogin from '../login_nav/NavLogin'
import Footer from '../footer/Footer'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { useSelector } from 'react-redux'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyCancelAppointment() {
    const[error,setError]=useState("");
    const [myAppointment,setMyAppointment]=useState([]);
    // const userId = useSelector((state) => state.auth.user.userId);
    const user=JSON.parse(localStorage.getItem('currentUser'))
    console.log("customerdetails",user)
    const userId=user.currentUser.UserID
    console.log("userId",userId);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/users/mycancelledappointment/${userId}`, {
            // headers: {
            //     "Authorization": `Bearer ${localStorage.getItem('token')}`
            // },
            withCredentials:true
            
        })
        .then(res=>{
            if(!res.data.Status){
                setError(res.data.message);
                console.log(res.data.Error)
            }else{
            console.log("appointment from backend",res.data.result);
            setMyAppointment(res.data.result);
            console.log("my Appointment",myAppointment);
            }})
        .catch(err=>{
            console.log(err);

        })
    },[])
    const handleDelete=(ID)=>{
        console.log("appointemnt id",ID);
        toast.error("Cannot Delete")
        // axios.post(`http://localhost:7000/api/user/users/appointmentcancel/${ID}`)
        // .then(res=>{
            // console.log(res.data.result);
            // setMyAppointment(res.data.result);
            // console.log("my Appointment",myAppointment);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }

  return (
    <div className='myapContainer'>
        <div className='appointmentList'>
        
            <div className='appointmentWrapper'>
            
            {error?(
                {error}
                ):myAppointment.length===0?(
                <p>No cancelled appointemnt</p>
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
                        {/* <th>Actions</th> */}
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
                        <td>{"₹ "+appointment.TotalPrice}</td>
                        <td>{appointment.PaymentMode}</td>
                        {/* <td><button className='cancelbtn' onClick={()=>handleDelete(appointment.AppointmentID)}>Delete</button>    </td> */}
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

export default MyCancelAppointment