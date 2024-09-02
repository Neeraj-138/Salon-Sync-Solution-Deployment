import React, { useState,useEffect } from 'react'
import './ourlocation.css'
import axios  from 'axios'

import  AOS from 'aos';
import 'aos/dist/aos.css';
function OurLocation() {
    useEffect(()=>{
        AOS.init({
            duration:1000,
            once:false
        });
    },[])
    const [branch,setBranches]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/branch/branches`)
        .then(
             res=>{
                console.log("branches",res.data.result);
                setBranches(res.data.result);

            }
        )
        .catch(error=>
            console.log(error)
        )
    },[])

    console.log("data from server",branch)
     const [selectedOption, setSelectedAddress] = useState({
        City: "Delhi", // Default value for City
        fullAddress: 'Natural Beauty Saloon, Delhi, Delhi - 110044',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112197.40330784023!2d77.17958224335936!3d28.504567099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce793fa4ed99b%3A0x1014db1baa2cf723!2sPUSHPENJIA%20HAIR%20AND%20BEAUTY%20SALOON!5e0!3m2!1sen!2sin!4v1712951957408!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
     });
    
      const handleSelectChange = (event) => {
        console.log("Selected",event.target.value)
        // setSelectedOption(event.target.value);
        // console.log("selection",branch.find(br=>branch.City===event.ta))
        const selectedBranch = branch.find(branch => branch.City === event.target.value);
        console.log("selection",selectedBranch)
        if (selectedBranch) {
            const fullAddress = `${selectedBranch.Name}, ${selectedBranch.City}, ${selectedBranch.State} - ${selectedBranch.PinCode}`;
            setSelectedAddress({
                fullAddress: fullAddress,
                location: selectedBranch.location // Assuming location is a property of the branch object
            });
        } else {
            setSelectedAddress({
                fullAddress: '',
                location: ''
            });
        }
      };
      console.log("selectedAddress",selectedOption)
  return (
    <div className='LocContainer'>
    
        <div className='LocWrapper'>
            <h2>Our Locations</h2>
            <div className='LocContent'>
                <div className='input' data-aos='flip-left'>
                    <select value={selectedOption.City} onChange={handleSelectChange}>
                        <option value="">Select...</option>
                        {
                            branch.map((option, index) => (
                            <option key={index} value={option.City}>
                                    {option.City}
                            </option>
                        ))}
                    </select>
    
                    <div>
                        <h4>Selected Branch: {
                            selectedOption.fullAddress
                            }</h4>

                    </div>
                </div>
                <div className='map' data-aos='zoom-in'>   
                    {selectedOption && (
                        <div>
                        
                        <iframe src={selectedOption.location}>
                            </iframe>
                        </div>
                    )}
                </div>
            </div>

        </div>
    
    
    </div>
  )
}

export default OurLocation