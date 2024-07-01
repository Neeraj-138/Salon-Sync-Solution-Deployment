import React from 'react'
import Slider from "react-slick";
import './reviews.css'
import axios from 'axios'
import  AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faComment, faCommentAlt, faCommentDots, faCommentSlash, faCommenting, faLocationDot, faLocationPin, faMobile, faMobileButton, faQuoteLeft, faQuoteRight, faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

function Reviews() {
  const [reviews,setReviews]=useState([]);
  useEffect(()=>{
    AOS.init({
        duration:1000,
        once:false
    });
  },[])
    useEffect(()=>{
      axios.get('https://salon-sync-solution.onrender.com/api/admin/allreviews')
      .then(res=>{
          console.log(res.data)
          setReviews(res.data.result)
      })
      .catch(err=>console.log(err))
    },[])
    console.log("reviews",reviews)

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    cssEase: "linear"
  };
  return (
    <div className='reviewcontainer'>

      <h2>Testimonials</h2>

      <div className='testimonial'>
        <h3>What our clients says about Us</h3>
        <h4>No two homes are alike!</h4>
        <p>
          Our Beauty Salon network combines with your personal needs,allow us to create a home plan specifically tailored to you
        </p>
      </div>
    <div className="slider-container">
     
      <Slider {...settings}>
        {
          reviews.map(item=>(
            <div className='reviewItem' data-aos='flip-left' >
            <div className='useDetail'>
              <div className='userimg'>
                <img src={item.customerImg}alt='' />
              </div>
              <div>
                <p><FontAwesomeIcon icon={faQuoteLeft} ></FontAwesomeIcon>  {item.reviews}<FontAwesomeIcon icon={faQuoteRight} ></FontAwesomeIcon></p>
              </div>
            </div>
            <div  className='name'>
              <p>
                {item.customerName}
              ({item.designation})</p>
            </div>
          </div>
          )) 
        }
      </Slider>
      <div>
        
      </div>
    </div>
    </div>

  )
}

export default Reviews;