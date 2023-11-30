import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name:"counter",
    initialState:{
        value:1,
        data:["momin","zayan"],
        newdata:[1,2]
    },
   
    reducers:{
        getsuccess:(state=initialState,action) => {
            state.value = state.value +1;            
            console.log("state", state.data);  //state.data = action.payload
            state.data = [...state.data, action.payload.data];        
            state.newdata = [...state.newdata, action.payload.newdata];        
            console.log("state", state.data)
            console.log("state", state.newdata)
        },
        increment: (state) => {
            state.value = state.value +1; 
        },
        decrement: (state) => {
            state.value = state.value - 1; 
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }

})

export const {increment, decrement,incrementByAmount,getsuccess } = counterSlice.actions;

export default counterSlice.reducer