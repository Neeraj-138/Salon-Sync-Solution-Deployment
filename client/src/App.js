import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home';
import Appointment from './pages/appointment/Appointment';
import Services from './pages/services/Services'
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import MyAppointment from './components/myAppointment/MyAppointment';
import BecomeEmployee from './components/becomeEmployee/BecomeEmployee';
import PaymentSuccess from './components/paymentSuccess/PaymentSuccess';
import ChooseAppointment from './components/chooseAppointment/ChooseAppointment';
import MyCancelAppointment from './components/myCancelAppointment/MyCancelAppointment';
import ContactUs from './components/contactus/ContactUs';
import SelectedCategory from './components/selectedCategory/SelectedCategory';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route  path='/login' element={<Login/>} />
      <Route  path='/register' element={<Register/>} />
      <Route  path='/appointment' element={<Appointment/>} />
      <Route  path='/services/selectedCategory/:category' element={<SelectedCategory/>} />
      <Route  path='/contactus' element={<ContactUs/>} />
      <Route  path='/myappointment' element={<ChooseAppointment/>} >
        <Route path='' element={<MyAppointment/>} />
        <Route path='/myappointment/mycancelappointment' element={<MyCancelAppointment/> } />
      </Route>
      <Route  path='/becomeEmployee' element={<BecomeEmployee/>} />
      <Route  path='/services' element={<Services/>} />
      <Route  path='/paymentSuccess' element={<PaymentSuccess/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
