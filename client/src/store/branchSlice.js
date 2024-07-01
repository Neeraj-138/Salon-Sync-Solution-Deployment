import {createSlice} from '@reduxjs/toolkit';

const branchSlice=createSlice({
    name:'branch',
    initialState:{
        branch:{},
        service:[],
        selectedDate:null,
        selectedSlot:null,
        totalAmount:null,
        error:null
    },
    error:null,
    reducers:{
        setBranch:(state,action)=>{
            state.branch=action.payload;
        },
        setServices: (state, action) => {
            state.service = action.payload;
          },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setSelectedSlot: (state, action) => {
            state.selectedSlot = action.payload;
          },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
          },
       
    }
})
export const {setTotalAmount,setBranch,setServices,setSelectedDate,setSelectedSlot} = branchSlice.actions;
export default branchSlice.reducer;