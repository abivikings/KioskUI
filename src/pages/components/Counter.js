import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, getsuccess } from '../../redux/state/counterSlice'

//import { decrement, increment,getsuccess } from '../../redux/state/counterSlice';

function Counter() {
  //   const store = createStore(todoReducer, applyMiddleware(thunk));
  //   store.subscribe(()=>{
  //     console.log("store",store.getState());
  //   })

  const count = useSelector(state => state.counter.value)
  const countdata = useSelector(state => state.counter.data)
  const countnewdata = useSelector(state => state.counter.newdata)
  console.log('count', count)
  console.log('countdata from State Management Store -> ', countdata.length)
  console.log('countnewdata', countnewdata)
  const dispatch = useDispatch()

  const fetchUserData = () => {
    if(countdata.length===0){
      fetch('https://vehayamachanechakadosh.com:8080/api/GetAllUserInfo?Stauts=all')
        .then(response => {
          console.log('response', response)
  
          return response.json()
        })
        .then(data => {
          const data12 = {
            data,
            newdata: data.length
          }
  
          dispatch(getsuccess(data12))
  
          // dispatch(getsuccess(data))
          console.log("Counter JS -> ",data)
        })
    }else{
      console.log("LOL , you already called it. Stop! Check your state :D  :p ")
    }
  }

  return (
    <>
      <div>
        <div>
          <h3>My Counter App</h3>
        </div>
      </div>
      <div>
        <h1>{count}</h1>

        <div>
          <button onClick={() => dispatch(increment())}>Increase</button>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
          <button onClick={() => fetchUserData()}>fetchdata</button>
        </div>
      </div>
    </>
  )
}

export default Counter
