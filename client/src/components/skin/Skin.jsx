import React, { useEffect } from 'react'
import './skin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function Skin({service,category}) {

  const navigate = useNavigate();
  console.log("send services",service)
  useEffect(()=>{
    // axios.get("")
  },[])

  const handleBook= ()=>{
    navigate('/appointment')
  }
  return (
    <div className='skinContainer'>
      <div className='poster'>
        <div className='contentSkin'>
          <h1><i>{category}</i></h1>
          <p>Get glowy, plump and fresh-looking skin with our skin treatment menu. From anti-ageing treatments to hydrating ones, we've got something for every skin type and concern.</p><p> Get the best skin care thanks to Bodycraft's experts and our assortment of skin care services.</p>
          
        </div>
      </div>
      <div class="grid-container">
  
        {

        service&&service.map((ser,i)=>(
            <div className='content_grid'>
              <div className='img'>
                <img src={ser.Image} alt=''></img>
              </div>
              <div className='content'>
                <h3>{ser.Name}</h3>
                <p>{ser.Description}</p>
                <h6>₹ {ser.Price}</h6>
                <button onClick={handleBook}>Book now</button>
              </div>
            </div>  
        ))
      }
      </div>

      
    </div>
  )
}

export default Skin