import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import NavLogin from '../../components/login_nav/NavLogin'
import Footer from '../../components/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import './appointment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faSearchengin } from '@fortawesome/free-brands-svg-icons'; // Use free-brands-svg-icons for brand icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faSearch} from "@fortawesome/free-solid-svg-icons";
import Branches from '../../components/branches/Branches'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ChooseDate from '../../components/chooseDate/ChooseDate'
import {setSelectedSlot, setServices, setTotalAmount } from '../../store/branchSlice'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import  AOS from 'aos';
import 'aos/dist/aos.css';


function Appointment() {
    useEffect(()=>{
        AOS.init({
            duration:1500,
            once:false
        });
    },[])
    const navigate=useNavigate();
    const branch = useSelector((state) => state.branch);
    const SelectedDate = useSelector((state) => state.branch.selectedDate);
    // const userId = useSelector((state) => state.auth.user.userId);
    const userId=localStorage.getItem('UserId')

    const dispatch=useDispatch();
    const [userName,setUser]=useState("");
    const [serviceSerached,setServiceSearched]=useState('');

    const handleSearchService=(serviceSearched)=>{
        console.log("searching",serviceSearched)
        const branchChoosen=branch.branch.City;
        console.log("selected branch is",branchChoosen)

        axios.get("http://localhost:7000/api/service/getSearchedService",{
            params: {
                service: serviceSearched,
                branch: branchChoosen
            }
            })
            .then( res=>{
                setService(res.data.result)
                console.log("BrancheServices",res.data.result)
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const [paymentMethod, setPaymentMethod] = useState('');
    const handlePaymentChange = (e) => {
      setPaymentMethod(e.target.value);
    };

        const handleServiceByCategorySearch=(category)=>{
            console.log("category :",category);
            const branchChoosen=branch.branch.City;
            
            axios.get("http://localhost:7000/api/service/getSearchedServicebyCategory",{
            params: {
                Category:category,
                Branch: branchChoosen
            }
            })
            .then( res=>{
                setService(res.data.result)
                console.log("BrancheServices",res.data.result)
            })
            .catch(error=>{
                console.log(error);
            })

        }


    //  for getting the userDetails
        useEffect(()=>{
            if(userId){
            axios.get(`http://localhost:7000/api/user/users/${userId}`,{},{ withCredentials: true })
            .then(res=>{
                console.log(res.data.status)
                // setId(userId);
                setUser(res.data.result[0])
                //   console.log("useEffect",userName)
                })
            .catch(error=>{
                console.log(error);
            })
            } 
        },[])

          console.log("Username",userName)

    const [openModel,setOpenModel]=useState(true);
    
    const[service,setService]=useState([]);
    const [selectedServiceData,setSelectedServiceData]=useState();
    
    const[bookedService,setBookedService]=useState([]);
    
    const handleChange=()=>{
        setOpenModel(true);
    }
    const[totalPrice,setTotalPrice]=useState(0);
    console.log(service)
    const[slot,setSlote]=useState(null);
    const handleSlot=(time)=>{
        console.log(time);
        setSlote(time);
        dispatch( setSelectedSlot( time));
    }
    const[finalservice,setFinalservice]=useState([]);

    // const totalSerAmount = finalservice.reduce((total, service) => total + service.Price, 0);


    useEffect(() => {
        const calculatedTotalPrice = finalservice.reduce((total, service) => total + service.Price, 0);
        setTotalPrice(calculatedTotalPrice);
        dispatch(setTotalAmount(calculatedTotalPrice));
    }, [finalservice, dispatch]);

    const handleCheckbox = (sId, Name, cId, Price, checked) => {
        Price = Number(Price); // Ensure Price is a number
        if (checked) {
            setFinalservice((prevState) => [...prevState, { sId, Name, cId, Price }]);
        } else {
            setFinalservice((prevState) => prevState.filter((service) => service.sId !== sId));
        }
    };
    

    // // const handleCheckbox=(sId,Name,cId,Price,checked)=>{
    // //     console.log("checked",checked);
    // //     if(checked===true){
    // //         // totalPrice=totalPrice+Price;
    // //         setFinalservice(prevState => [...prevState, { sId, Name,cId, Price }]);
    // //         setTotalPrice(prevTotalPrice => prevTotalPrice + Price);

    // //     } else {
    // //         // Remove the selected service from the array
    // //          setFinalservice(prevState => prevState.filter(service => service.sId !== sId));
    // //         setTotalPrice(prevTotalPrice => prevTotalPrice - Price);
    // //       }
    //     console.log("selecting: ",finalservice);
    //     console.log("total",totalPrice)
    
    // }
    
    useEffect(() => {
        console.log("selecting: ", finalservice,totalPrice);
    }, [finalservice]);
    const [choosenDate,setChoosenDate]=useState(null);
    // console.log("working?",setSelectedServiceData);

    useEffect(() => {
        if(SelectedDate)
        {
            setChoosenDate(SelectedDate.slice(5,17));
        }
    }, [SelectedDate]);
    
    
    const totalAmount=useSelector((state) => state.branch.totalAmount);
    // console.log("from redux",branch.branch.bId);
    // console.log("Price from redux",totalAmount);
        useEffect(()=>{
        try {
            axios.get(`http://localhost:7000/api/service/service/${branch.branch.bId}`)
            .then(res=>{
                setService(res.data.result);
                console.log("service from database",res.data.result);
            })
            .catch()
        } catch (error) {
            console.log(error)
        }
    },[branch.branch.bId])
   const slots = ['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
    // const navigate=useNavigate();
    
    // booking handle 

   const handleBookAppointment=async()=>{
        const bookingData = {
            userId: userId, // Assuming userId is just a single value; this needs to be part of your payload
            branchId: branch.branch.bId,
            paymentMode:paymentMethod,
            date: choosenDate,
            slot: slot,
            totalAmount: totalPrice,
            services: finalservice, // Make sure this is the format your backend expects
        };
        if(!bookingData.userId){
            navigate('/login');
        }
        if(!bookingData.branchId||!bookingData.paymentMode||!bookingData.date||!bookingData.slot||bookingData.services.length===0){
            // alert("Please fill all fields")
            console.log("bookingData",bookingData);
            toast.error("Please fill all fields",);
        }
        else
        {
            console.log("form data to submitted",bookingData);
            alert("want to confirm booking")
            if(bookingData.paymentMode==='online'){
                await axios.post("http://localhost:7000/api/payment/paymentCheckout",{bookingData},{ withCredentials: true})
                .then(
                    res=>{
                        console.log("response from checkout id:",res.data.order.id)
                        const options = {
                            key: "rzp_test_q4hhrH5FZ0PawV", // Enter the Key ID generated from the Dashboard
                            amount: totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                            currency: "INR",
                            bookingData:bookingData,
                            name: userName.FirstName+" "+userName.LastName,
                            description: "Test Transaction",
                            image: "https://example.com/your_logo",
                            order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                            callback_url: "http://localhost:7000/api/payment/paymentVerification",
                            prefill: {
                                name: "Neeraj",
                                email: "neerajrn.786@gmail.com",
                                contact: "9000090000"
                            },
                            notes: {
                                "address": "Razorpay Corporate Office"
                            },
                            theme: {
                                "color": "#3399cc"
                            }
                        };
                    
                        var razor = new window.Razorpay(options);
                            razor.open();
                        
        
                    }
                )
                .catch(
                    error=>{console.log(error)
                    }
                )
    
            }
            else{
                // send booking data for offline booking option

                axios.post("http://localhost:7000/api/booking/booking",{bookingData},{withCredentials:true})
                .then(res=>{
                    console.log(res.data.result)
                    if(res.data.Status){
                        toast.success("Booked successfully");
                        setTimeout(() => {
                            navigate('/');                            
                        }, 2000);
                    }
                    else{
                        toast.error("Backend Could not Book",res.data.Error)
                    }

                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }


        
        // console.log(window);
        
        console.log("For booking",bookingData);
        
   }
  return (
    <div>
        <NavLogin/>
        <Navbar/>
        <div className='bookcontainer'>
            <div className='book'>
                {openModel&&<Branches openModel={setOpenModel} />}
                <div className='branch'> 
                    <h2>Select Branch</h2>
                    <div className='location'>
                        <div className='place'>
                            <h3>{branch.branch.Name+ ", "+branch.branch.City}</h3>
                        </div>
                        <div className='change'>
                            <button onClick={handleChange}>Change location</button>
                        </div>
                    </div>
                </div>
                    
                <div className='servicer'>
                    <div className='servicebox'>
                    <div className='servicetitle'>
                        <h2>Select Service</h2>
                    </div>
                    <div className='search'>
                        <input type='text' placeholder='Search Service' onChange={(e)=>setServiceSearched(e.target.value)} />
                        <FontAwesomeIcon  icon={faSearch} onClick={()=>handleSearchService(serviceSerached)} className='i'/>

                    </div>
                    </div>   
                </div>
                <div className='serviceContainer' data-aos='flip-left'>
                    <div className='serviceWrapper'>
                        <div className='serviceList'>
                            <ul className='serviceitem'>
                                <li><Link onClick={()=>handleServiceByCategorySearch('hair')}> HAIR</Link></li>
                                <li><Link onClick={()=>handleServiceByCategorySearch('Hand & Feet')}> HANDS & FEET</Link></li>
                                <li><Link onClick={()=>handleServiceByCategorySearch('Make Up')}>MAKEUP</Link></li>
                                <li><Link onClick={()=>handleServiceByCategorySearch('skin')}> SKIN</Link></li>
                            </ul>
                        </div>
                        <div className='serviceSearched'>
                         {service.map((ser,i)=>(
                            <div className='searchResult' key={i}>
                                <div className='titlee'>
                                    <h5 className='para'>{ser.Name}</h5>
                                    <p className='para'>
                                        Dermi pernanent ammonia free service with transparent molecule to give glass shine .
                                    </p>
                                </div>
                                <div className='price'>
                                    <div className='ir'>
                                        {/* <span><FontAwesomeIcon icon={faIndianRupeeSign}/></span> */}
                                        <span><h4>₹ {ser.Price}/-</h4></span>
                                    </div>
                                    <div>
                                        <h5>40min</h5>
                                    </div>
                                </div>
                                <div className='check'>
                                    <input type='checkbox'
                                         onChange={(e) => handleCheckbox(ser.sId, ser.Name,ser.cId, ser.Price, e.target.checked)}
                                        checked={finalservice.some(service => service.sId === ser.sId)} 
                                
                                     />
                                </div>
                            </div>
                         ))}
                        </div>
                    </div>
                </div>
                <div className='paymentmethod'>
                    <label htmlFor="paymentMethod">Select Payment Method:</label>
                    <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentChange}>
                        <option value="">Select...</option>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>
                </div>

                <div className='timeslote'  data-aos='flip-left'>
                        <div className='date'>
                            <ChooseDate/>                            
                        </div>
                        <div className='Time'>
                        {
                            slots.map(time=>(
                                <div className='slot'>
                                <p>{time}</p>
                                <input type='checkbox' className='ch' onClick={()=>handleSlot(time)} ></input>
                            </div>
                            ))
                        }
                        </div>
                </div>
                    <div className='amountContainer' data-aos='flip-right'>
                        <div className='amountDesc'>
                            <div className='datetime'>
                                <p>{SelectedDate} @ {slot}</p>
                            </div>
                            <div className='amounttbl'>
                                <table border="1">
                                <thead>
                                    <tr>    
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalservice.map(serv=>(
                                    <tr key={serv.sId}>
                                        <td>{serv.Name}</td>
                                        <td>₹{serv.Price}</td>
                                    </tr>
                                    ))}

                                    <tr>
                                        <td>Total</td>
                                        <td>₹{totalPrice}</td>
                                    </tr>
                                </tbody>
                                </table>

                            </div>
                            <div>
                                <p>* Final prices and durations will be reflected in the confirmation screen</p>
                            </div>
                        </div>
                        <div className='bookbtn'>
                            {paymentMethod === "online" ? (
                                <button onClick={()=>handleBookAppointment('online')}>Book & Pay</button>
                            ) : (
                                <button onClick={()=>handleBookAppointment('cod')}>Book appointment</button>
                            )}
                        </div>

            </div>
            </div>
            
        </div>
      
        <Footer/>
        <ToastContainer/>
    </div>
   
  )
}

export default Appointment;