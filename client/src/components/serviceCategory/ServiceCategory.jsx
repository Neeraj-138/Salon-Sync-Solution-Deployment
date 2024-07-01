import React, { useEffect } from 'react'
import './serviceCategory.css'
import Category from '../category/Category'
import { useNavigate } from 'react-router-dom';
// import Category from '../category/Category'

import  AOS from 'aos';
import 'aos/dist/aos.css';
function ServiceCategory() {
    const navigate = useNavigate();
    useEffect(()=>{
        AOS.init({
            duration:1000,
            once:false
        });
    },[])

    const selectCategory = (category)=>{
        console.log("category",category);
        navigate(`/services/selectedCategory/${category}`)

    }

  return (
    <div className='outercontainer'>
      
    <div className='innercontainer'>
    <div className='innerMost'>
        <div className='catego' data-aos='fade-right'>
            <Category/>
        </div>
        <div className='Servicecontent'>
            <div className='row1'>
                <div className='card' data-aos='fade-right' onClick={()=>selectCategory('Skin')} >
                    <div className='card1'><img src='https://www.lakmesalon.in/service/skin.jpg'></img></div>
                    <div className='card2'><h3>SKIN</h3></div>   
                </div>
                <div className='card'   data-aos='fade-left' onClick={()=>selectCategory('Hair')}>
                    <div className='card1'><img src='https://www.lakmesalon.in/service/hair.jpg'></img></div>
                    <div className='card2'><h3>HAIR</h3></div>  
                </div>
            </div>      
            <div className='row2'>
                <div className='card'   data-aos='fade-right' onClick={()=>selectCategory('Make up')}>
                    <div className='card1'><img src='https://www.lakmesalon.in/service/makeup.jpg'></img></div>  
                    <div className='card2'><h3>MAKE UP</h3></div>  
                </div>
                <div className='card'   data-aos='fade-left' onClick={()=>selectCategory('Hand & Feet')}>
                    <div className='card1'><img src='https://www.lakmesalon.in/service/handfeet.jpg'></img></div>
                    <div className='card2'><h3>HANDS & FEET</h3></div>   
                </div>
            </div> 
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default ServiceCategory