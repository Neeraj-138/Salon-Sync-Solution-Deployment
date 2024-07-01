import React, { useState } from 'react'
import NavLogin from '../login_nav/NavLogin'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import OurLocation from '../ourLocation/OurLocation';
import './contactus.css'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationDot, faLocationPin, faMobile, faMobileButton, faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ContactUs() {
  const userId=localStorage.getItem('UserId')
  const[customerId,setCustmerId]=useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact:'',
        message: '',
        customerId:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCustmerId(userId);
        setFormData({
          ...formData,
          [name]: value,
          customerId:customerId

        });
      };
      // setFormData(...formData,{customerId:userId})
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your form submission logic here, such as sending the form data to a server.
        console.log("form data",formData);
        console.log("customerId",userId);
        axios.post('http://localhost:7000/api/user/users/contacts',formData)
        .then(res=>{
          toast.success("Submitted  Successfully")
          console.log(res.data)
        })
        .catch(err=>console.log(err))
        // Reset form fields after submission
        setFormData({
          name: '',
          email: '',
          contact:'',
          message: '',
          customerId:''
        });
      };
  return (
    <div>
          
        <NavLogin/>
        <Navbar/>
          <div className='SerContainer'>
            <div className='SerWrapper'>
              {/* <img className='poster' src='https://getwallpapers.com/wallpaper/full/9/2/9/483842.jpg' alt=''></img> */}
              <img className='poster' src='https://tse3.mm.bing.net/th?id=OIP.VSrnByWyqhmJBfGztAlYiAHaCO&pid=Api&P=0&h=180' alt=''></img>
              {/* <img className='poster' src='https://wallpaperaccess.com/full/2182701.jpg' alt=''></img> */}
              <div className='Heading'>
                <h1>Contact Us</h1>
              </div>
              <div className='contactus'>
                    <div className='headOffice' >
                        
                        <div>
                        <h1>  <FontAwesomeIcon icon={faLocationDot} ></FontAwesomeIcon>Head Office</h1>
                            <h4> No 17A / 22, Ajmal Khan Road, Karol Bagh</h4>
                            <h4> New Delhi - 110 005</h4>
                            <h4><FontAwesomeIcon icon={faMobileButton} ></FontAwesomeIcon> 1800 212 56657</h4>
                        </div>
                    </div>
                <div className='contactForm'>
                    <h1>Get in Touch</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='contactInput'>
                        
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Full Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'

                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className='contactInputcontact'>
                          <input
                              type="number"
                              id="contact"
                              placeholder='Contact Number'
                              name="contact"
                              value={formData.contact}
                              onChange={handleChange}
                              required
                          />
                        </div>
                        <div className='textArea'>
                          <textarea
                              id="message"
                              placeholder='Your Message'
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                          />
                        </div>
                      <button type="submit">Submit</button>  
                    </form>
                </div>
                
              
              
              
              </div>

            
            </div>
          </div>
        <OurLocation/>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default ContactUs