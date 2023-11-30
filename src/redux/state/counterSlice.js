import { createSlice } from '@reduxjs/toolkit'

// const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'

// const getTodoSuccess = todos => {
//   return {
//     type: GET_TODO_SUCCESS,
//     payload: todos
//   }
// }

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 1,
    data: [],
    newdata: []
  },

  reducers: {
    getsuccess: (state = initialState, action) => {
      state.value = state.value + 1

      //state.data = action.payload
      console.log('state data 01 => ', state.data)
      state.data = [...state.data, action.payload.data]
      state.newdata = [...state.newdata, action.payload.newdata]
      console.log('state data 02 => ', state.data)
      console.log('state data 03 =>', state.newdata)
    },
    increment: state => {
      state.value = state.value + 1
    },
    decrement: state => {
      state.value = state.value - 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, getsuccess } = counterSlice.actions

export default counterSlice.reducer
