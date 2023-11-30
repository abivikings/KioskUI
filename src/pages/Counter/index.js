import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { decrement, increment,getsuccess } from '../../store/state/counterSlice';



function Counter() {
//   const store = createStore(todoReducer, applyMiddleware(thunk));
//   store.subscribe(()=>{
//     console.log("store",store.getState());
// })
 
    const count = useSelector((state)=> state.counter.value);    
    const countdata = useSelector((state)=> state.counter.data);    
    const countnewdata = useSelector((state)=> state.counter.newdata); 
    console.log("count",count)
    console.log("countdata",countdata)
    console.log("countnewdata",countnewdata)
    const dispatch = useDispatch();    
   
    const fetchUserData = () => {
      fetch("https://vehayamachanechakadosh.com:8080/api/GetAllUserInfo?Stauts=all")
        .then(response => {         
          return response.json()
        })
        .then(data => {                  
          //dispatch(getsuccess(data12))
          dispatch(getsuccess(data))
          console.log(data)
        })
    }
   


  return (
    <>
    <div >
        <div >
            <h3 >My Counter App</h3>
        </div>
    </div>
     <div >
        <h1>{count}</h1>
        
        <div>
            <button  onClick={()=> dispatch(increment())}>Increase</button>
            <button  onClick={()=>dispatch(decrement())} >Decrease</button>
            <button  onClick={()=> fetchUserData()} >fetchdata</button>     
           
        </div>

    </div>

         
    </>
    
  )
}

export default Counter