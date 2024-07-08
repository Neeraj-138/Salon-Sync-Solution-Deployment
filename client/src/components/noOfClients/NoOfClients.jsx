import React, { useEffect, useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import  AOS from 'aos';
import CountUp from 'react-countup';
import 'aos/dist/aos.css';
import './noOfClients.css'
import  axios from 'axios'
function NoOfClients() {
    
    const [counterOn,setCounterOn]=useState(false);

    useEffect(()=>{
        AOS.init({
            duration:1000,
            once:false
        });
    },[])
    const handleEnterViewport = () => {
        setCounterOn(true);
    };

    const handleExitViewport = () => {
        setCounterOn(false);
    };

    const [therapist,setTherapist] = useState(0);
    useEffect(()=>{
        axios.get('https://neerajtest.onrender.com/api/branch/branches/therapist')
        .then(res=>{
            if(!res.data.Status){
                console.log(res.data.message)

            }else{
                console.log("Response from backend",res.data.result[0].Therapist);
                setTherapist(res.data.result[0].Therapist);
            }   
    })
    .catch(err=>{
        console.log(err);

    })
    },[])

    const [client,setClient] =useState(0);
    useEffect(()=>{
        axios.get('https://neerajtest.onrender.com/api/branch/branches/details')
        .then(res=>{
            if(!res.data.Status){
                // setError(res.data.message);
                console.log("totalClients",res.data.result)
            }else{
            console.log("Response from backend",res.data.result[0].Clients);
            setClient(res.data.result[0].Clients);
            // console.log("my Appointment",myAppointment);
            }
            // console.log("Response from backend",res);
        })
        .catch(err=>{
            console.log(err);

        })
    },[])
    const [bookings,setBookings] = useState(0);
    useEffect(()=>{
        axios.get('https://neerajtest.onrender.com/api/branch/branches/appointment')
        .then(res=>{
            if(!res.data.Status){
                console.log(res.data.message)
            }else{
                console.log("Response for total bookings",res.data.result[0].Bookings);
                setBookings(res.data.result[0].Bookings);
            }   
    })
    .catch(err=>{
        console.log(err);

    })
    },[])



  return (
    <div className='NoContainer'>
        <div className='Norow'>
            <div className='NoWrapper'  data-aos='flip-left'>
                <div>
                    <ScrollTrigger  onEnter={handleEnterViewport} onExit={handleExitViewport}>
                        <span>{counterOn&&<CountUp  start={0} end={therapist} duration={2} delay={0}/>} </span>
                        <b>+</b>
                    </ScrollTrigger>
                    
                </div>
                <span className='nw'>Total Employee</span>
            </div>
            <div className='NoWrapper'data-aos='flip-left'>
                <div>
                    <ScrollTrigger  onEnter={handleEnterViewport} onExit={handleExitViewport}>
                        <span>{counterOn&&<CountUp  start={0} end={client} duration={2} delay={0}/>} </span>
                        <b>+</b>
                    </ScrollTrigger>
                   
                </div>
                <span className='nw'>Clients</span>
            </div>
            <div className='NoWrapper'data-aos='flip-left'>
                <div>
                    <ScrollTrigger  onEnter={handleEnterViewport} onExit={handleExitViewport}>
                        <span>{counterOn&&<CountUp  start={0} end={bookings} duration={2} delay={0}/>} </span>
                        <b>+</b>
                    </ScrollTrigger>
                    
                </div>
                <span className='nw'>Total Booking</span>

            </div>
            
            
        </div>

    </div>
  )
}

export default NoOfClients