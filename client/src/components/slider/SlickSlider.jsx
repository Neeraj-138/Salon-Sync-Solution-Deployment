import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slider.css'



function SlickSlider() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
   const images=[
    
    "https://www.mirrorsspaandsalon.com/wp-content/uploads/2022/10/mirrors-banner2-luxury.jpg",
    "https://www.mirrorsspaandsalon.com/wp-content/uploads/2017/01/home-slider11.jpg",
    "https://i.pinimg.com/originals/51/17/95/5117958355b6b0e393567a580f81cc4f.jpg",
    "https://i.pinimg.com/originals/c6/71/fa/c671fa3b514c36216c1f031281816982.jpg"
    
   ]
    const settings = {
        dots: true,
        infinite: true,      
        prevArrow: <SamplePrevArrow/>,
        nextArrow: <SampleNextArrow/>,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // speed: 200,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
  return (
    <div className='scontainer'>
      <div className='slider'>

         <Slider {...settings} >
         
         {images.map(image=>(
          <div className='item'>
            <img src={image} alt=''></img>
          </div>

         ))}
        </Slider>
    
    
        </div>
    
    
    </div>
  )
}

export default SlickSlider