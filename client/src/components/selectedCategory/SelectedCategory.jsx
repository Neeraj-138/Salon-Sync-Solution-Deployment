import React, { useEffect, useState } from 'react'
// import NavLogin from '../../components/login_nav/NavLogin';
// import Navbar from '../..components/navbar/Navbar';
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import NavLogin from '../login_nav/NavLogin';
import Footer from '../footer/Footer';
import Skin from '../skin/Skin';
import axios from 'axios';
// import Footer from '../..components/footer/Footer';

function SelectedCategory() {
    const {category} = useParams();
    console.log("now selected category",category);
    const[service,setServices]=useState([]);
    useEffect(()=>{
      
      axios.get(`http://localhost:8000/api/service/getServicebycategory/${category}`)
      .then(res=>{
        setServices(res.data.result);
        console.log("service by category",res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    },[])
  return (
    <div>
        <NavLogin/>
        <Navbar/>
         <Skin service={service} category={category}/>     
        <Footer/>
    </div>
  )
}

export default SelectedCategory