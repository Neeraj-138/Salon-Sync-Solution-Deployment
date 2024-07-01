import React from 'react'
import './paymentSuccess.css'
import NavLogin from '../login_nav/NavLogin'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useSearchParams } from 'react-router-dom'
function PaymentSuccess() {
    const searchQuery=useSearchParams()[0];
    const referenceNum=searchQuery.get('reference')
  return (
    <>
    <NavLogin/>
    <Navbar/>
    <div className='successContainer'>
        <h1>Booked Successfully</h1>
        <h3>Reference no:{referenceNum}</h3>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess