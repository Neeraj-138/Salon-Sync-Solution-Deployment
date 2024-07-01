import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import SlickSlider from '../../components/slider/SlickSlider'
import NavLogin from '../../components/login_nav/NavLogin'
import Service from '../../components/service/Service'
import Footer from '../../components/footer/Footer'
// import TrendingServices from '../../components/trendingServices/TrendingServices'
import NoOfClients from '../../components/noOfClients/NoOfClients'
import WhyChoose from '../../components/whyChoose/WhyChoose'
import OurLocation from '../../components/ourLocation/OurLocation'
import { ToastContainer} from "react-toastify";
import Reviews from '../../components/reviews/Reviews'
function Home() {
  return (
    <div className='container'>
        <NavLogin/>
        <Navbar/>
        <SlickSlider/>
        <NoOfClients/>
        {/* <TrendingServices/>  */}
        <Service/>
        <WhyChoose/>
        <Reviews/>
        <OurLocation/>
        <Footer/>
      <ToastContainer />

    </div>
  )
}

export default Home