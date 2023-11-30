import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
//import { decrement, increment,getsuccess } from '../../redux/profile/profileSlice';
import { decrement, increment,getsuccess } from '../../redux/profile/profileSlice';



function Profile() {
//   const store = createStore(todoReducer, applyMiddleware(thunk));
//   store.subscribe(()=>{
//     console.log("store",store.getState());
// })
 
    const count = useSelector((state)=> state.profile.value);    
    const profiledata = useSelector((state)=> state.profile.data);       
    console.log("profile",count)
    console.log("profiledata",profiledata)    
    const dispatch = useDispatch();    
   
    const fetchUserData = () => {
      fetch("https://vehayamachanechakadosh.com:8080/api/GetAllUserInfo?Stauts=all")
        .then(response => {
          console.log("response",response)
          
          return response.json()
        })
        .then(data => {          
          const data12 ={
            data:'profile2'           
          }
          dispatch(getsuccess(data12))
          //dispatch(getsuccess(data))
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

export default Profile