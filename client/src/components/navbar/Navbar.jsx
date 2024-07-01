import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import './navbar.css'
function Navbar() {
    const location = useLocation();
  return (
    <div className='navContainer'>
    <div className='navbar'>
            <ul className="nav-links">
                <li >
                    <Link  to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link>
                </li>
                <li>
                    <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}   >SERVICES</Link>
                </li>
               
                <li>
                    <Link to="/appointment" className={location.pathname === '/appointment'  ? 'active' : ''}>BOOK APPOINTMENT</Link>
                </li>
                <li>
                    <Link to="/myappointment"   className={location.pathname === '/myappointment' ? 'active' : ''}>MY APPOINTMENTS</Link>
                </li>
                <li>
                    <Link to="/contactus"   className={location.pathname === '/contactus' ? 'active' : ''}>CONTACT US</Link>
                </li>
               
            </ul>
            <div className='become'>
            
                <Link to="/BecomeEmployee"><h2>BECOME EMPLOYEE</h2></Link>

            </div>
            
        </div>
    </div>
  )
}

export default Navbar