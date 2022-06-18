import {createReducer} from '@reduxjs/toolkit';


const initialState = {};

export const userReducer = createReducer(initialState,{

    AddUser: (state, action)=>{
        state.user = action.payload;
    }

})