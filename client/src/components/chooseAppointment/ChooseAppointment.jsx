import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavLogin from '../login_nav/NavLogin'
import Login from '../../pages/login/Login'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './chooseAppointment.css'

import  AOS from 'aos';
import 'aos/dist/aos.css';

function ChooseAppointment() {
  useEffect(()=>{
    AOS.init({
        duration:1500,
        once:false
    });
},[])
  return (
    <div className='ChooseAppointmentContainer'>
        <div className='ChooseAppointmentWrapper'>
            <NavLogin/>
            <Navbar/>
            <div className='content-wrapper'>

              <div className='option' style={{ zIndex: 10 }}  data-aos='flip-right'>
              <Link className='li' to={'/myappointment'}>Booked Appointment</Link>  
              <Link className='li' to={'/myappointment/mycancelappointment'}>Cancelled Appointment</Link>
              </div>
              <div className='coutlet'>
                  <Outlet/>
              </div>
            </div>

            <Footer/>
        </div>
    </div>
  )
}

export default ChooseAppointment