import React, { useEffect } from 'react'
import NavLogin from '../../components/login_nav/NavLogin'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './services.css'

import  AOS from 'aos';
import 'aos/dist/aos.css';

import ServiceCategory from '../../components/serviceCategory/ServiceCategory'
function Services() {
  useEffect(()=>{
    AOS.init({
        duration:1500,
        once:false
    });
},[])
  return (
    <div>
    <NavLogin/>
    <Navbar/>
      <div className='SerContainer'>
        <div className='SerWrapper'>
          <img className='poster' src='https://getwallpapers.com/wallpaper/full/9/2/9/483842.jpg' alt=''></img>
          <div className='Heading'>
             <h1>Services</h1>
          </div>
          <div  >
            <ServiceCategory/>
          </div>

         
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Services