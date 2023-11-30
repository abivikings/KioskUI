import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './state/counterSlice';


// import rootReducer from './reducers'

// const store = configureStore({ reducer: rootReducer })

export default configureStore({

    reducer:{
        counter:counterReducer       
    }

})