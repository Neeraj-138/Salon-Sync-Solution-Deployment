import React, { useEffect } from 'react'
import './service.css'
import { Link } from 'react-router-dom'
import  AOS from 'aos';
import 'aos/dist/aos.css';
function Service() {
    useEffect(()=>{
        AOS.init({
            duration:1000,
            once:false
        });
    },[])
    const images=[
        {
            img: 'https://img.freepik.com/premium-photo/little-boy-getting-haircut-by-barber-while-sitting-chair-barbershop_152637-5813.jpg?w=360', 
            name:"Hair Cut"
        },
        { 
            img:  'https://www.lakmesalon.in/subcategorycontent/1669811856.women-hair-haircare.jpg',
            name:"Hair color"
        }
      , {
            img:'https://img.freepik.com/free-photo/beautician-with-brush-applies-white-moisturizing-mask-face-young-girl-client-spa-beauty-salon_343596-4248.jpg?size=626&ext=jpg&ga=GA1.1.1767759521.1692443896&semt=ais',
            name:"Facial"            
        },{
            img: 'https://img.freepik.com/premium-photo/beautiful-woman-standing-with-arms-raised_1048944-26742256.jpg?w=826',
            name:"Hair Styling"
        },{      
            img:  'https://img.freepik.com/premium-photo/professional-styling-close-up-side-view-young-bearded-man-getting-haircut_425904-16270.jpg?w=826',
            name:"Men Hair Cut"
        }   
    ]
  return (
    <div className='sercontainer' >
        <div className='heading'>
            <div className='items'>
                <h2 >Our Services</h2>
                <Link to={'/services'}><h5>See All</h5></Link>
            </div>
        </div>
        <div className='serComment'>  
            <h3>Beauty salon are specially designed to give you that inner glow and make you feel beautiful.</h3>     
            <p>Our runway experts have curated some of the most popular services at Beauty Salon, just for you.
              </p>
        </div>

        <div className='service' >
        
        {
            <>{images.map((image,i)=>(
                <div    data-aos='zoom-in' className='serviceItem'>
                <img className='serviceImg' alt=''
                src={image.img}/>
                    <div className='serviceTitle'>
                        <h1>{image.name}</h1>
                        <h2>Styling</h2>
                    </div>
                </div>
            ))}
        </>
        }
        </div>
    </div>
  )
}

export default Service