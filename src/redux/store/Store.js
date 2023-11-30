import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../state/counterSlice';
import userReducer from '../user/userSlice';
import profileSlice from '../profile/profileSlice';

// import rootReducer from './reducers'

// const store = configureStore({ reducer: rootReducer })

export default configureStore({

    reducer:{
        counter:counterReducer,
        users:userReducer,
        profile:profileSlice
    }

})