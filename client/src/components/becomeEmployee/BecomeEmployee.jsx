import React from 'react'
import Navbar from '../navbar/Navbar'
import NavLogin from '../login_nav/NavLogin'
import Footer from '../footer/Footer'
import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import './becomeEmployee.css'
import { useSelector } from 'react-redux'
import { useId } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import  AOS from 'aos';
import 'aos/dist/aos.css';
function BecomeEmployee() {
  useEffect(()=>{
    AOS.init({
        duration:1500,
        once:false
    });
},[])
  const [branches,setBranches]=useState([]);
  const [result,setResult]=useState("");
  const [selectedBranchId, setSelectedBranch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
 
  
  // const CustomerID = useSelector((state) => state.auth.user.userId); 
  const CustomerID=localStorage.getItem('UserId')

  console.log(useId); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 
  useEffect(()=>{
    axios.get(`https://salon-sync-solution.onrender.com/api/branch/branches`)
    .then( res=>{
      setBranches(res.data.result);
      console.log(branches)
    } )
    .catch(err=>console.log(err))
  },[])

const formData ={
  branchId:selectedBranchId,
  CustomerId:CustomerID,
  file:selectedFile
}


const handleRequest=async()=>{
  
console.log("form data",formData);
  if(formData.branchId===undefined||selectedFile===undefined)
  {
    // toast.success("Login successfully")
    // alert("Please fill  all field")
    toast.error("Please fill  all field ", {     
      autoClose: 2000,
     });
  }
  else{
    console.log("sendingrequest ")
    await axios.post(`https://salon-sync-solution.onrender.com/api/admin/request`,formData,{
      withCredentials: true,
      headers:{ 'Content-Type': 'multipart/form-data'}
     }
      )
   .then(response => {
 
     console.log('Request sent successfully:', response.data.Result);
     if(response.data.Status){
      toast.success("Request sent successfully")

     }
     else{
      toast.error(response.data.Result, {     
        autoClose: 2000,
    });
     }


     setResult(response.data.result);
   })
   .catch(error => {
     console.error('Error sending request:', error);
    
   });
  }

 
}

  return (
    <div>
        <NavLogin/>
        <Navbar/>
        <div className='beEmployeeContainer'>
        {
          result&&result
        }
            <div className='beWrapper'  data-aos='flip-left'>
            <div className='request'>
              <h2>Choose Branch</h2>
              <select className='selectBr' onChange={(e) => setSelectedBranch(e.target.value)}>
                <option className='option' value="">Select Branch</option>
                {branches.map(branch => (
                  <option className='option' key={branch.bId} value={branch.bId}>
                  {branch.Name}- {branch.City}
                  </option>
                ))}
              </select>
              <div className='resume'>
                <h4>Upload your Resume</h4>
                <input required type='file' name="file" onChange={handleFileChange} />
              </div>

              <button className='reqbtn' onClick={handleRequest}>Request</button>

              </div>
            </div>
        </div>


        <Footer/>
        <ToastContainer />
    </div>
  )
}

export default BecomeEmployee