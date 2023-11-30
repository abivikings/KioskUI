import { createSlice } from '@reduxjs/toolkit'

// const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'

// const getTodoSuccess = todos => {
//   return {
//     type: GET_TODO_SUCCESS,
//     payload: todos
//   }
// }

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    // value: 1,
    data: [],
    newdata: []
  },

  reducers: {
    usersList: (state = initialState, action) => {
      console.log('state', state.data)
      state.data = [...state.data, action.payload.data]
    }, 

    // getsuccess: (state = initialState, action) => {
    //   // state.value = state.value + 1

    //   state.data = action.payload
    //   console.log('state', state.data)
    //   state.data = [...state.data, action.payload.data]
    //   state.newdata = [...state.newdata, action.payload.newdata]
    //   console.log('state', state.data)
    //   console.log('state', state.newdata)
    // },

    // increment: state => {
    //   state.value = state.value + 1
    // },
    // decrement: state => {
    //   state.value = state.value - 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  }
})

export const { usersList } = userSlice.actions

export default userSlice.reducer
