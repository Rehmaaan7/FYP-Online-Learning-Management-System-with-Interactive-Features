import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"myName",
    initialState:{
        user:null,
        authentication:false

    },
    reducers:{
        loggedIn:(state, action)=>{
            state.user = action.payload.user;
            state.authentication = true;
        },
        loggedOut:(state, action) =>{
            state.user = null;
            state.authentication = false;
        }
    }

})
// slice in redux toolkit returns two things, action and reducer.
export const {loggedIn,loggedOut} = authSlice.actions
export default authSlice.reducer
