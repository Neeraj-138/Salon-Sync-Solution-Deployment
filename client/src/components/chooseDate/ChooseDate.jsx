import React, { useState } from 'react';
import './chooseDate.css'
import 'react-datepicker/dist/react-datepicker.css';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../store/branchSlice';
// import { setSelectedDate } from '../../store/appointmentSlice';
// import appointmentSlice from '../../store/appointmentSlice';
const ChooseDate=()=>{
    const [date, setDate] = useState(new Date());
      const dispatch=useDispatch();
    //   console.log(selectedDate)
      const handleDateChange=(newDate)=>{
       
        // dispatch(setSelectedDate(newDate));
        const formattedDate = newDate.toLocaleDateString('en-US', { weekday: 'short',  month: 'short', day: 'numeric',year: 'numeric'});
        console.log(formattedDate);
        setDate(formattedDate);
        dispatch(setSelectedDate( formattedDate));

    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Adding one day to the current date
  
return (
   <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker orientation="portrait" 
                  onChange={handleDateChange}
                  minDate={tomorrow}
                  maxDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
            />
        </LocalizationProvider>
      </div>
   </> 
  )
};
export default ChooseDate;
