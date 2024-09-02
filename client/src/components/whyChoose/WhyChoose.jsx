import React, { useEffect } from 'react'
import './whychoose.css'
import  AOS from 'aos';
import 'aos/dist/aos.css';
import  {Link, useNavigate} from 'react-router-dom'
function WhyChoose() {

    useEffect(()=>{
        AOS.init({
            duration:1000,
            once:false
        });
    },[])
    const   navigate=useNavigate();
    const  handleBook=()=>{
        navigate('/appointment')

    }
  return (
    <div className='whyContainer' >
        <div className='whyWrapper' >
            <div className='whyChoose'  >                   
                <h2>Why Choose SalonSync Solution?</h2>
               <div className='reasons'>
                    <div  className='workinghour' data-aos='zoom-in' data-aos-delay="300"  >
                        <div>
                            <h2>Working Hour</h2>
                                <ul>
                                    <li>SUNDAY  10AM-8PM</li>
                                    <li>MONDAY  10AM-8PM</li>
                                    <li>TUESDAY  10AM-8PM</li>
                                    <li>WEDNESDAY  10AM-8PM</li>
                                    <li>THURSDAY  10AM-8PM</li>
                                    <li>FRIDAY  10AM-8PM</li>
                                    <li>SATURDAY  10AM-8PM</li>
                                </ul>
                                <div    className='loginContent'>
                                    <button onClick={handleBook} className='loginContent' >Book Appointment</button>

                                </div>
                        </div>
                    </div>
                    <div>
                        <div className='why'    data-aos='zoom-in'>
                            <h2>Why Choose SalonSync Solution ?</h2>
                            <h4>In addition there 5 more reasons why people prefer Beauty saloon:    </h4>
                                
                            <ul>
                                <li>Always  welcoming environment</li>
                                <li>Our artist  focus   on  the quality</li>
                                <li>We value both money and time of Our clients</li>
                                <li>We work only with high-quality, hypoallergenic and premium products</li>
                                <li>All surfaces and tools are cleaned, disinfected before and after using</li>
                                
                            </ul>
                            <div    className='loginContent'>
                                    <button className='loginContent' onClick={handleBook}  >Book Appointment</button>

                                </div>
                        </div>
                        
                    </div>
               </div>
            </div>

        </div>

    
    
    </div>
  )
}

export default WhyChoose