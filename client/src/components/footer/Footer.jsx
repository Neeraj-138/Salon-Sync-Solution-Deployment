import React, { useEffect } from 'react'
import  AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faSquareFacebook, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'; // Use free-brands-svg-icons for brand icons

import './footer.css'
import { Link } from 'react-router-dom';
function Footer() {
    useEffect(()=>{
        AOS.init({
            duration:800,
            once:false
        });
    },[])
  return (
    <div className='footer'>
        <div className='fcontainer'>

            <div className='know' data-aos="zoom-in">
                <h3>KNOW US </h3>
                <div >
                    <ul className='flist'>           
                        <li className='flistItem'>About Us</li>
                        <li className='flistItem'>Runway Rewards</li>
                        <li className='flistItem'>Blog</li>
                        <li className='flistItem'>Contact Us</li>
                    </ul>

                </div>
            </div>
            <div className='cservice' data-aos="zoom-in">
                <h3>CUSTOMER SERVICES</h3>
                <ul className='flist'>
                <li className='flistItem'>Privacy Policy</li>
                    <li className='flistItem'>Terms & Conditions</li>
                    <li className='flistItem'>Trust & Safety</li>
                    <li className='flistItem'>Report issue</li>
                </ul>
            </div>
            <div className='help' data-aos="zoom-in">
                <h3>NEED HELP</h3>
                <ul className='flist'>
                    <li className='flistItem'>TOLL FREE:1800-123-1915</li>
                    <li className='flistItem'>EMAIL:NEERAJRN@786@GMAIL.COM</li>    
                </ul>
              
            </div>
            <div className='copyright' data-aos="zoom-in">   
                <div className='social' data-aos='zoom-in'>
                    <Link to={'https://www.facebook.com/neeraj.vishwakarma.33671748'}><FontAwesomeIcon icon={faSquareFacebook}  className='i'/></Link>
                    <Link to={'https://www.linkedin.com/in/neeraj-vishwakarma-02376b17b/'}><FontAwesomeIcon icon={faLinkedin} className='i' /></Link>
                    <FontAwesomeIcon icon={faInstagram} className='i'/>
                    <FontAwesomeIcon icon={faTwitterSquare} className='i' />
                    
                </div>
                <div className='rights'>
                    <p>
                        All trademarks are the property of thier respective owner
                    </p>
                    <p>All rights reserved @ 2024 Beautysaloon.in</p>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Footer